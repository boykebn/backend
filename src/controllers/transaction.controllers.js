const { selectAllTransaction, insertTransaction, selectTransactionId, updateTransaction, deletedTransaction, selectCountAllTransaction } = require('../models/transaction.models')
const errorHandler = require('../helpers/errorHandler.helpers')
const filters = require('../helpers/filter.helpers')

exports.readAllTransaction = (req, res) => {
  const sortable = ['name', 'createdAt', 'updatedAt']
  filters(req.query, sortable, selectCountAllTransaction, res, (filter, pageInfo) => {
    selectAllTransaction(filter, (err, data) => {
      if(err){
        return errorHandler(err, res);
      }
      return res.status(200).json({
        succes: true,
        message: 'List All Transaction',
        pageInfo,
        results: data.rows
      });
    });
  });
};

exports.readTransaction = (req, res) => {
  selectTransactionId(req.params, (err, data) => {
    if(err){
      console.log(err);
      return errorHandler(err, res);
    }
    return res.status(200).json({
      succes: true,
      message: 'Database by Id access sucsessfully',
      results: data.rows[0]
    })
  })
};

exports.createTransaction = (req, res) => {
  insertTransaction(req.body, (err, data) => {
    if(err){
      return errorHandler(err, res);
    }
    return res.status(200).json({
      succes: true,
      message: 'Users created sucsessfully',
      results: data.rows[0]
    })
  })
};

exports.updateTransaction = (req, res) => {
  updateTransaction(req, (err, data) => {
    if(err){
      return errorHandler(err, res);
    }
    return res.status(200).json({
      succes: true,
      message: 'Users UPDATE sucsessfully',
      results: data.rows[0]
    })
  })
};

exports.deleteTransaction = (req, res) => {
  deletedTransaction(req.params, (err, data) => {
    if(err){
      return errorHandler(err, res);
    }
    return res.status(200).json({
      succes: true,
      message: 'Users deleted sucsessfully',
      results: data.rows
    })
  })
};