const express = require('express');
const router = express.Router();
const transactionDetailController = require('../controllers/transactionDetailController');

router.get('/', transactionDetailController.getAllTransactionDetails);
router.get('/:id', transactionDetailController.getTransactionDetailById);
router.post('/', transactionDetailController.createTransactionDetail);
router.put('/:id', transactionDetailController.updateTransactionDetail);
router.delete('/:id', transactionDetailController.deleteTransactionDetail);

module.exports = router;

