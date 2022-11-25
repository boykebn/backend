const transactionRouter = require('express').Router();

const { readAllTransaction, readTransaction, createTransaction, updateTransaction, deleteTransaction } = require('../controllers/transaction.controllers');

transactionRouter.get('/', readAllTransaction);
transactionRouter.get('/:id', readTransaction);
transactionRouter.post('/', createTransaction);
transactionRouter.patch('/:id', updateTransaction);
transactionRouter.delete('/:id', deleteTransaction);

module.exports = transactionRouter;