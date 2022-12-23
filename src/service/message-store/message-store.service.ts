import { Injectable } from "@nestjs/common";
import knex, { Knex } from "knex";
import * as dotenv from "dotenv";
import { Message } from "src/model/event/event.interface";
import { pg } from "pg";
import { Bluebird } from "bluebird";
import { VersionConflictError } from "src/model/version-conflict-error/version-conflict-error";

@Injectable()
export class MessageStoreService {

  private static readonly WRITE_FUNCTION_SQL = "SELECT message_store.write_message($1, $2, $3, $4, $5, $6)";
  private static readonly VERSION_CONFLICT_REGEX = /^Wrong.*Stream Version: (\d+)\)/;

  private client: any;
  private connectedClient: any;

  constructor() {
    dotenv.config();
    this.client = new pg.Client({ connectionString: process.env.MESSAGE_STORE_CONNECTION_STRING, Promise: Bluebird });
  }

  private connect(): any {
    if (!this.connectedClient) {
      this.connectedClient = this.client.connect()
        .then(() => this.client.query("SET search_path = message_store, public"))
        .then(() => this.client);
    }
    return this.connectedClient;
  }

  async stop(): Promise<void> {
    this.client.end();
  }

  async query(sql, values = []): Promise<any> {
    return this.connect().then((client) => client.query(sql, values));
  }

  async write(
    streamName: string,
    message: Message,
    expectedVersion: number,
  ): Promise<any> {
    if (!message.type) {
      throw new Error("Messages must have a type");
    }

    const values = [
      message.id,
      streamName,
      message.type,
      message.data,
      message.metadata,
      expectedVersion
    ];

    return this.query(MessageStoreService.WRITE_FUNCTION_SQL, values).catch(
      (err) => {
        const errorMatch = err.message.match(
          MessageStoreService.VERSION_CONFLICT_REGEX
        );
        const notVersionConflict = errorMatch === null;
        if (notVersionConflict) {
          throw err;
        }
        const actualVersion = parseInt(errorMatch[1], 10);
        const versionConflictError = new VersionConflictError(
          streamName,
          actualVersion,
          expectedVersion,
        );
        versionConflictError.stack = err.stack;
        throw versionConflictError;
      },
    );
  }
}
