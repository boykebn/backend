const errorHandler = require('../helpers/errorHandler.helpers');
const { selectAllMovies, selectMoviesId, insertMovies, updateMovies, deletedMovies } = require('../models/movies.models');

exports.readAllMovies = (req, res) => {
  selectAllMovies(req.body, (err, data) => {
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

exports.readMovies = (req, res) => {
  selectMoviesId(req.params, (err, data) => {
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

exports.createMovies= (req, res) => {
  insertMovies(req.body, (err, data) => {
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

exports.updateMovies = (req, res) => {
  updateMovies(req, (err, data) => {
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

exports.deleteMovies = (req, res) => {
  deletedMovies(req.params, (err, data) => {
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