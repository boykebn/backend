const errorHandler = require('../helpers/errorHandler.helpers');
const { selectAllMovieSchedules, selectMovieSchedulesId, insertMovieSchedules, updateMovieSchedules, deletedMovieSchedules } = require('../models/movieSchedules.models');

exports.readAllMovieSchedules = (req, res) => {
  selectAllMovieSchedules(req.body, (err, data) => {
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

exports.readMovieSchedules = (req, res) => {
  selectMovieSchedulesId(req.params, (err, data) => {
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

exports.createMovieSchedules= (req, res) => {
  insertMovieSchedules(req.body, (err, data) => {
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

exports.updateMovieSchedules = (req, res) => {
  updateMovieSchedules(req, (err, data) => {
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

exports.deleteMovieSchedules = (req, res) => {
  deletedMovieSchedules(req.params, (err, data) => {
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