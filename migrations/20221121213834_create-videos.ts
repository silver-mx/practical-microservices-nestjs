import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('videos', table => {
    table.increments();
    table.string('owner_id');

    table.string('name');
    table.string('description');
    table.string('transcoding_status');
    table.integer('view_count').defaultTo(0);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('videos');
}
