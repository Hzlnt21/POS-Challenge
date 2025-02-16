const db = require('../config/db');

const TransactionDetail = {
    getAll: (callback) => {
        db.query('SELECT * FROM transaction_detail', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM transaction_detail WHERE id = ?', [id], callback);
    },
    create: (data, callback) => {
        db.query('INSERT INTO transaction_detail SET ?', data, callback);
    },
    update: (id, data, callback) => {
        db.query('UPDATE transaction_detail SET ? WHERE id = ?', [data, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM transaction_detail WHERE id = ?', [id], callback);
    },
    getByTransactionId: (transaction_id, callback) => {
        db.query('SELECT * FROM transaction_detail WHERE transaction_id = ?', [transaction_id], callback);
    }
};

module.exports = TransactionDetail;

