const Product = require('../models/productModel');

exports.getAllProducts = (req, res) => {
    Product.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getProductById = (req, res) => {
    Product.getById(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results[0]);
    });
};

exports.createProduct = (req, res) => {
    const { name, price, stock } = req.body;

    if (!name || !price || !stock) {
        return res.status(400).json({ error: "Name, price, and stock are required" });
    }

    Product.create(req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Product created', id: results.insertId });
    });
};

exports.updateProduct = (req, res) => {
    const { name, price, stock } = req.body;

    if (!name || !price || !stock) {
        return res.status(400).json({ error: "Name, price, and stock are required" });
    }

    Product.update(req.params.id, req.body, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product updated' });
    });
};

exports.deleteProduct = (req, res) => {
    Product.delete(req.params.id, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product deleted' });
    });
};

