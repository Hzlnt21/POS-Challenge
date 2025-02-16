const db = require('../config/db');

const Customer = {
    getAll: (callback) => {
        db.query('SELECT * FROM customers WHERE deleted_at IS NULL', callback);
    },

    getById: (id, callback) => {
        db.query('SELECT * FROM customers WHERE id = ? AND deleted_at IS NULL', [id], callback);
    },

    create: (data, callback) => {
        db.query('INSERT INTO customers SET ?', data, callback);
    },

    update: (id, data, callback) => {
        db.query('UPDATE customers SET ? WHERE id = ?', [data, id], callback);
    },

    delete: (id, callback) => {
        db.query('UPDATE customers SET deleted_at = NOW() WHERE id = ?', [id], callback);
    },

    restore: (id, callback) => {
        db.query('UPDATE customers SET deleted_at = NULL WHERE id = ?', [id], callback);
    }
};

module.exports = Customer;
