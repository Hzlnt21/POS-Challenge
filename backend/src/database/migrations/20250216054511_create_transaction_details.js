/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('transaction_details', (table) => {
      table.increments('id').primary();
      table.integer('transaction_id').unsigned().notNullable();
      table.foreign('transaction_id').references('transactions.id').onDelete('CASCADE');
      table.integer('product_id').unsigned().notNullable();
      table.foreign('product_id').references('products.id').onDelete('CASCADE');
      table.integer('quantity').notNullable();
      table.decimal('subtotal', 10, 2).notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('transaction_details');
  };
  
