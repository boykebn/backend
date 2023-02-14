const transactionRouter = require('express').Router();

const { readAllTransaction, readTransaction, createTransaction, updateTransaction, deleteTransaction, orderTransaction, historyById } = require('../controllers/transaction.controllers');


transactionRouter.get('/', readAllTransaction);
transactionRouter.get('/history', readTransaction);
transactionRouter.get('/history/:id', historyById);
transactionRouter.post('/orderTransaction', orderTransaction);
transactionRouter.post('/', createTransaction);
transactionRouter.patch('/:id', updateTransaction);
transactionRouter.delete('/:id', deleteTransaction);

module.exports = transactionRouter;