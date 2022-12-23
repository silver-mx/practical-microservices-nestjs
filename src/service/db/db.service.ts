import { Injectable } from "@nestjs/common";
import { Knex, knex } from "knex";
import { Bluebird } from "bluebird";
import * as dotenv from "dotenv";
import camelcaseKeys from 'camelcase-keys';

@Injectable()
export class DbService {

  private client: Knex<any, unknown>;

  constructor() {
    dotenv.config();
    this.client = knex(process.env.DATABASE_URL);
  }

  async getPageData(pageName: string): Promise<any> {
    return this.client('pages')
      .where({ page_name: pageName })
      .limit(1)
      .then(camelcaseKeys)
      .then((rows) => rows[0]);
  }

  async executeRaw(query: string, data: any): Promise<any> {
    return this.client.raw(query, data);
  }
}
