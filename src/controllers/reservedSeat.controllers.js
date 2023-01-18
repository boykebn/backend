const errorHandler = require('../helpers/errorHandler.helpers');
const { selectAllReservedSeat, selectReservedSeatId, insertReservedSeat, updateReservedSeat, deletedReservedSeat } = require('../models/reservedSeat.models');

exports.readAllReservedSeat = (req, res) => {
  selectAllReservedSeat(req.body, (err, data) => {
    if(err){
      console.log(err)
    }
    return res.status(200).json({
      succes: true,
      message: 'Database access sucsessfully',
      results: data.rows
    })
  })
};

exports.readReservedSeat = (req, res) => {
  selectReservedSeatId(req.params, (err, data) => {
    if(err){
      return errorHandler(err, res);
    }
    return res.status(200).json({
      succes: true,
      message: 'Database by Id access sucsessfully',
      results: data.rows[0]
    })
  })
};

exports.createReservedSeat = (req, res) => {
  insertReservedSeat(req.body, (err, data) => {
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

exports.updateReservedSeat = (req, res) => {
  updateReservedSeat(req, (err, data) => {
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

exports.deleteReservedSeat = (req, res) => {
  deletedReservedSeat(req.params, (err, data) => {
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