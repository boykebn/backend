const { selectAllSubscribers, selectSubscribersId, insertSubscribers, updateSubscribers, deletedSubscribers } = require('../models/subscribers.models')
const errorHandler = require('../helpers/errorHandler.helpers')

exports.readAllSubscribers = (req, res) => {
  selectAllSubscribers(req.body, (err, data) => {
    if(err){
      console.log(err)
      return errorHandler(err, res);
    }
    return res.status(200).json({
      succes: true,
      message: 'Database access sucsessfully',
      results: data.rows
    })
  })
};

exports.readSubscribers = (req, res) => {
  selectSubscribersId(req.params, (err, data) => {
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

exports.createSubscribers = (req, res) => {
  insertSubscribers(req.body, (err, data) => {
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

exports.updateSubscribers = (req, res) => {
  updateSubscribers(req, (err, data) => {
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

exports.deleteSubscribers = (req, res) => {
  deletedSubscribers(req.params, (err, data) => {
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