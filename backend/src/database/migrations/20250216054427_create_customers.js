/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('customers', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').unique();
      table.string('phone').notNullable();
      table.string('address');
      table.timestamp('deleted_at').nullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('customers');
  };
  
