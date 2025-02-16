const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const customerRoutes = require('./routes/customerRoutes');
const productRoutes = require('./routes/productRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const transactionDetailRoutes = require('./routes/transactionDetailRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api/customers', customerRoutes);
app.use('/api/products', productRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/transaction-details', transactionDetailRoutes);

app.get('/', (req, res) => {
    res.send('POS API is running...');
});

module.exports = app;
