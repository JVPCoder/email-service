// migrations/20240601_create_users.js
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('id').primary(); // auto-incremental
      table.string('nome', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('senha', 255).notNullable();
      table.timestamps(true, true); // created_at e updated_at automáticos
    });
  }

  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
    return knex.schema.dropTable('users');
  }
