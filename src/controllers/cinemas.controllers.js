const errorHandler = require('../helpers/errorHandler.helpers');
const { selectAllCinemas, selectCinemasId, insertCinemas, updateCinemas, deletedCinemas, selectCountAllCinemas } = require('../models/cinemas.models');
const filters = require('../helpers/filter.helpers')

exports.readAllCinemas = (req, res) => {
  const sortable = ['name', 'createdAt', 'updatedAt']
  filters(req.query, sortable, selectCountAllCinemas, res, (filter, pageInfo) => {
    selectAllCinemas(filter, (err, data) => {
      if(err){
        return errorHandler(err, res);
      }
      return res.status(200).json({
        succes: true,
        message: 'List All Cinemas',
        pageInfo,
        results: data.rows
      });
    });
  });
};

exports.readCinemas = (req, res) => {
  selectCinemasId(req.params, (err, data) => {
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

exports.createCinemas = (req, res) => {
  insertCinemas(req.body, (err, data) => {
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

exports.updateCinemas = (req, res) => {
  updateCinemas(req, (err, data) => {
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

exports.deleteCinemas = (req, res) => {
  deletedCinemas(req.params, (err, data) => {
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