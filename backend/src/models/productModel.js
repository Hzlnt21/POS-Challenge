const db = require('../config/db');

const Product = {
    getAll: (callback) => {
        db.query('SELECT * FROM products', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM products WHERE id = ?', [id], callback);
    },
    getPriceById: (id, callback) => { // Fungsi baru untuk mengambil harga 1 produk
        db.query('SELECT price FROM products WHERE id = ?', [id], (err, results) => {
            
            
            if (err) return callback(err, null);
            if (results.length === 0) return callback(null, null);
            callback(null, results[0].price); // Mengembalikan hanya harga produk
        });
    },
    create: (data, callback) => {
        db.query('INSERT INTO products SET ?', data, callback);
    },
    update: (id, data, callback) => {
        db.query('UPDATE products SET ? WHERE id = ?', [data, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM products WHERE id = ?', [id], callback);
    }
};

module.exports = Product;

