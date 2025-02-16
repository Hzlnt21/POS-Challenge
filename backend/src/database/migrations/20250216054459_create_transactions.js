/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('transactions', (table) => {
      table.increments('id').primary();
      table.integer('customer_id').unsigned().notNullable();
      table.foreign('customer_id').references('customers.id').onDelete('CASCADE');
      table.decimal('total_amount', 10, 2).notNullable();
      table.dateTime('transaction_date').defaultTo(knex.fn.now());
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('transactions');
  };
  
