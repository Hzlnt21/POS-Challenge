const db = require('../config/db');

const Transaction = {
    getAll: (callback) => {
        db.query('SELECT * FROM transactions', callback);
    },
    getById: (id, callback) => {
        db.query('SELECT * FROM transactions WHERE id = ?', [id], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0] || null);
        });
    },
    create: (data, callback) => {
        db.query('INSERT INTO transactions SET ?', data, callback);
    },
    update: (id, data, callback) => {
        db.query('UPDATE transactions SET ? WHERE id = ?', [data, id], callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM transactions WHERE id = ?', [id], callback);
    },
    getDetail: (transaction_id, callback) => {
        db.query(`
            SELECT td.*, p.name as product_name, p.price as product_price 
            FROM transaction_details td 
            JOIN products p ON td.product_id = p.id 
            WHERE td.transaction_id = ?
        `, [transaction_id], callback);
    },
    addDetails: (details, callback) => {
        const sql = 'INSERT INTO transaction_details (transaction_id, product_id, quantity, subtotal) VALUES ?';
        db.query(sql, [details], (err) => {
            if (err) return callback(err);
    
            const products = details.map(detail => ({
                id: detail[1],  // Index 1 adalah product_id
                quantity: -detail[2]  // Index 2 adalah quantity
            }));
    
            // Gunakan Promise.all untuk menjalankan semua update stock secara paralel
            const updatePromises = products.map(product => {
                return new Promise((resolve, reject) => {
                    db.query(`
                        UPDATE products
                        SET stock = stock + ?
                        WHERE id = ?
                    `, [product.quantity, product.id], (err) => {
                        if (err) return reject(err);
                        resolve();
                    });
                });
            });
    
            // Tunggu semua update selesai sebelum memanggil callback()
            Promise.all(updatePromises)
                .then(() => callback(null))
                .catch(callback);
        });
    }
    
};

module.exports = Transaction;
