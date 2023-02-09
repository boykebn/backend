const { selectAllTransaction, insertTransaction, selectTransactionId, updateTransaction, deletedTransaction, selectCountAllTransaction, orderedTransaction, selectOrderedById } = require('../models/transaction.models')
const errorHandler = require('../helpers/errorHandler.helpers')
const jwt = require('jsonwebtoken')
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
  const authorization = req.headers.authorization;
  const token = authorization.split(" ")[1];
  const validated = jwt.verify(token, process.env.SECRET_KEY);
  const { id } = validated;
  console.log(id)
  selectTransactionId(id, (err, data) => {
    if(err){
      console.log(err);
      return errorHandler(err, res);
    }
    return res.status(200).json({
      succes: true,
      message: 'Transaction by Id access sucsessfully',
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

exports.orderTransaction = (req, res) => {
  const authorization = req.headers.authorization.split(' ')[1];
  const auth = jwt.verify(authorization, process.env.SECRET_KEY || "backend-secret");
  const { id } = auth;

  const result = {
    userId: id,
    bookingDate: req.body.bookingDate,
    movieId: req.body.movieId,
    cinemaId: req.body.cinemaId,
    movieSchedulesId: req.body.movieSchedulesId,
    fullName: req.body.fullName,
    email: req.body.email,
    phoneNUm: req.body.phoneNUm,
    statusId: req.body.statusId,
    paymentMethodId: req.body.paymentMethodId,
    seatNum: req.body.seatNum,
    time: req.body.time,
    totalPrice: req.body.totalPrice
  }
  orderedTransaction(result, (err, data) => {
    if(err){
      return errorHandler(err, res);
    }
    return res.status(200).json({
      succes: true,
      message: 'Order created sucsessfully',
      results: data
    })
  })
};

exports.historyById = async (req, res) => {
  try {
    const historyUser = await selectOrderedById(req.params);
    return res.status(200).json({
      success: true,
      message: "History By Id Success",
      results: historyUser[0],
    });
  } catch (error) {
    console.log(error)
  }
};