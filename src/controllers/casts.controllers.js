const errorHandler = require('../helpers/errorHandler.helpers');
const { selectAllCasts, selectCastsId, insertCasts, updateCasts, deletedCasts, selectCountAllCasts } = require('../models/casts.models');
const filters = require('../helpers/filter.helpers')

exports.readAllCasts = (req, res) => {
  const sortable = ['name', 'createdAt', 'updatedAt']
  filters(req.query, sortable, selectCountAllCasts, res, (filter, pageInfo) => {
    selectAllCasts(filter, (err, data) => {
      if(err){
        return errorHandler(err, res);
      }
      return res.status(200).json({
        success: true,
        message: 'List ALL Casts',
        pageInfo,
        results: data.rows
      });
    });
  });
};

exports.readCasts = (req, res) => {
  selectCastsId(req.params, (err, data) => {
    if(err){
      return errorHandler(err, res);
    }
    return res.status(200).json({
      success: true,
      message: 'Database by Id access sucsessfully',
      results: data.rows[0]
    })
  })
};

exports.createCasts = (req, res) => {
  insertCasts(req.body, (err, data) => {
    if(err){
      return errorHandler(err, res);
    }
    return res.status(200).json({
      success: true,
      message: 'Users created sucsessfully',
      results: data.rows[0]
    })
  })
};

exports.updateCasts = (req, res) => {
  updateCasts(req, (err, data) => {
    if(err){
      return errorHandler(err, res);
    }
    return res.status(200).json({
      success: true,
      message: 'Users UPDATE sucsessfully',
      results: data.rows[0]
    })
  })
};

exports.deleteCasts = (req, res) => {
  deletedCasts(req.params, (err, data) => {
    if(err){
      return errorHandler(err, res);
    }
    return res.status(200).json({
      success: true,
      message: 'Users deleted sucsessfully',
      results: data.rows
    })
  })
};