import { Injectable } from '@nestjs/common';
import { Knex, knex } from 'knex';
import * as dotenv from 'dotenv';

@Injectable()
export class MigrationService {

  private client: Knex<any, unknown>;

  constructor() {
    dotenv.config();
    this.client = knex(process.env.DATABASE_URL);
  }

  async migrate(migrationsTableName: string = 'knex_migrations'): Promise<void> {
    const migrationOptions = { tableName: migrationsTableName, loadExtensions: ['.ts', '.js'] };
    const Promise = require("bluebird");
    console.log('JUST BEFORE');
    Promise.resolve(this.client.migrate.latest(migrationOptions));
  }

}
