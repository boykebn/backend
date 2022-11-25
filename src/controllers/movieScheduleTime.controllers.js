const errorHandler = require('../helpers/errorHandler.helpers');
const { selectAllMovieScheduleTime, selectMovieScheduleTimeId, insertMovieScheduleTime, updateMovieScheduleTime, deletedMovieScheduleTime } = require('../models/movieScheduleTime.models');

exports.readAllMovieScheduleTime = (req, res) => {
  selectAllMovieScheduleTime(req.body, (err, data) => {
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

exports.readMovieScheduleTime = (req, res) => {
  selectMovieScheduleTimeId(req.params, (err, data) => {
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

exports.createMovieScheduleTime= (req, res) => {
  insertMovieScheduleTime(req.body, (err, data) => {
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

exports.updateMovieScheduleTime = (req, res) => {
  updateMovieScheduleTime(req, (err, data) => {
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

exports.deleteMovieScheduleTime = (req, res) => {
  deletedMovieScheduleTime(req.params, (err, data) => {
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