const TransactionDetail = require('../models/transactionDetailModel');

exports.getAllTransactionDetails = (req, res) => {
    TransactionDetail.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getTransactionDetailById = (req, res) => {
    TransactionDetail.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
};

exports.createTransactionDetail = (req, res) => {
    TransactionDetail.create(req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Transaction detail created', id: results.insertId });
    });
};

exports.updateTransactionDetail = (req, res) => {
    TransactionDetail.update(req.params.id, req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Transaction detail updated' });
    });
};

exports.deleteTransactionDetail = (req, res) => {
    TransactionDetail.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Transaction detail deleted' });
    });
};

