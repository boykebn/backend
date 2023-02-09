const transactionRouter = require('express').Router();

const { readAllTransaction, readTransaction, createTransaction, updateTransaction, deleteTransaction, orderTransaction } = require('../controllers/transaction.controllers');
const { selectOrderedById } = require('../models/transaction.models');

transactionRouter.get('/', readAllTransaction);
transactionRouter.get('/history', readTransaction);
transactionRouter.get('/history/:id', selectOrderedById);
transactionRouter.post('/orderTransaction', orderTransaction);
transactionRouter.post('/', createTransaction);
transactionRouter.patch('/:id', updateTransaction);
transactionRouter.delete('/:id', deleteTransaction);

module.exports = transactionRouter;