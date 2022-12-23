import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  knex.schema.createTable('pages', table => {
    table.string('page_name').primary();
    table.jsonb('page_data').defaultTo('{}');
  });
}


export async function down(knex: Knex): Promise<void> {
  knex.schema.dropTable('pages');
}
