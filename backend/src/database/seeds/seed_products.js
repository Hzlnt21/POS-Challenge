/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = function(knex) {
  return knex('products').del()
    .then(() => {
      return knex('products').insert([
        { name: 'Laptop', price: 7500000, stock: 10 },
        { name: 'Smartphone', price: 5000000, stock: 15 },
      ]);
    });
};
