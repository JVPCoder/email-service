// migrations/20240601_create_emails.js
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable('emails', (table) => {
      table.increments('id').primary();
      table.integer('user_id').unsigned().notNullable()
        .references('id').inTable('users').onDelete('CASCADE');
      table.string('assunto', 255).notNullable();
      table.string('email_remetente', 255).notNullable();
      table.string('email_destinatario', 255).notNullable();
      table.text('corpo').notNullable();
      table.enu('status', ['enviado', 'lido']).defaultTo('enviado');
      table.timestamp('data_envio').defaultTo(knex.fn.now());
      table.timestamps(true, true);
    });
  }

  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export function down(knex) {
    return knex.schema.dropTable('emails');
  }
