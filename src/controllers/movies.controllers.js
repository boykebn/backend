const errorHandler = require('../helpers/errorHandler.helpers');
const { selectAllMovies, selectMoviesId, insertMovies, updateMovies, deletedMovies, selectCountAllMovies, upComingMovie, nowShowing, nowShowingMovie, selectFilterUpComing } = require('../models/movies.models');
const filters = require('../helpers/filter.helpers')

exports.readAllMovies = (req, res) => {
  const sortable = ['name', 'createdAt', 'updatedAt']
  filters(req.query, sortable, selectCountAllMovies, res, (filter, pageInfo) => {
    selectAllMovies(filter, (err, data) => {
      if(err){
        return errorHandler(err, res);
      }
      return res.status(200).json({
        succes: true,
        message: 'List All Movies',
        pageInfo,
        results: data.rows
      });
    });
  });
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
  updateMovies(req.params.id, req.body,  (err, data) => {
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

exports.upcoming = (req, res) => {
  const sortable = ['movieTitle', 'releaseDate', 'genre']
  filters(req.query, sortable, selectFilterUpComing, res, (filter, pageInfo) => {
    upComingMovie(filter, (err, data) => {
      // console.log(err)
      if (err) {
        return errorHandler(err, res);
      }
      return res.json({
        success: true,
        message: 'Up Coming Movie',
        pageInfo,
        results: data.rows,
      })
    })
  });
};

exports.nowShowing = (req, res) => {
  nowShowingMovie((err, data) => {
    if (err) {
      console.log(err)
      return errorHandler(err, res);
    }
    return res.json({
      success: true,
      message: 'Now Showing Movies',
      results: data.rows,
    })
  })
};