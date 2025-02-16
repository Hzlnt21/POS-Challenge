const Transaction = require('../models/transactionModel');
const Product = require('../models/productModel');

exports.getAllTransactions = (req, res) => {
    Transaction.getAll((err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.getTransactionById = (req, res) => {
    Transaction.getById(req.params.id, (err, transaction) => {
        if (err) return res.status(500).json({ error: err.message });
        if (!transaction) return res.status(404).json({ message: 'Transaction not found' });

        // Ambil detail transaksi
        Transaction.getDetail(req.params.id, (err, details) => {
            if (err) return res.status(500).json({ error: err.message });

            res.json({
                ...transaction,
                details
            });
        });
    });
};

exports.createTransaction = async (req, res) => {
    try {
        const { customer_id, items } = req.body;

        if (!customer_id || !items || items.length === 0) {
            return res.status(400).json({ error: "Customer ID and items are required" });
        }

        let total_amount = 0;
        let transactionDetails = [];

        // Ambil harga semua produk menggunakan Promise.all
        const itemPrices = await Promise.all(items.map(item => {
            return new Promise((resolve, reject) => {
                Product.getPriceById(item.product_id, (err, price) => {
                    if (err) return reject(err);
                    if (!price) return reject(new Error(`Product with ID ${item.product_id} not found`));

                    resolve({ ...item, price });
                });
            });
        }));

        // Hitung total harga dan buat daftar transaksi detail
        itemPrices.forEach(item => {
            const itemTotal = item.quantity * item.price;
            total_amount += itemTotal;
            transactionDetails.push([null, item.product_id, item.quantity, itemTotal]);
        });

        

        // Simpan transaksi utama
        Transaction.create({ customer_id, total_amount }, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });

            const transaction_id = result.insertId;

            // Update transaction_id di setiap transaksi detail
            transactionDetails = transactionDetails.map(detail => [transaction_id, ...detail.slice(1)]);

            // Simpan detail transaksi
            Transaction.addDetails(transactionDetails, (err) => {
                if (err) return res.status(500).json({ error: err.message });

                res.status(201).json({
                    message: "Transaction created successfully"
                });
            });
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.updateTransaction = (req, res) => {
    Transaction.update(req.params.id, req.body, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Transaction updated' });
    });
};

exports.deleteTransaction = (req, res) => {
    Transaction.delete(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Transaction deleted' });
    });
};
