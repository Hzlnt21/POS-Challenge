const Customer = require('../models/customerModel');

exports.getAllCustomers = (req, res) => {
    Customer.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getCustomerById = (req, res) => {
    Customer.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
};

exports.createCustomer = (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ error: "Name, email, and phone are required" });
    }

    Customer.create(req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Customer created', id: results.insertId });
    });
};

exports.updateCustomer = (req, res) => {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        return res.status(400).json({ error: "Name, email, and phone are required" });
    }

    Customer.update(req.params.id, req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Customer updated' });
    });
};

exports.deleteCustomer = (req, res) => {
    Customer.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Customer soft deleted' });
    });
};

exports.restoreCustomer = (req, res) => {
    Customer.restore(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Customer restored' });
    });
};
