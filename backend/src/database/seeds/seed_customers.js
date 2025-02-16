/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('customers').del()
    .then(() => {
      return knex('customers').insert([
        { name: 'John Doe', email: 'john@example.com', phone: '081234567890', address: 'Jakarta' },
        { name: 'Jane Smith', email: 'jane@example.com', phone: '081298765432', address: 'Bandung' },
      ]);
    });
};
