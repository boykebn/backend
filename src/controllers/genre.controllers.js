const errorHandler = require('../helpers/errorHandler.helpers');
const { selectAllGenre, selectGenreId, insertGenre, updateGenre, deletedGenre, selectCountAllGenre } = require('../models/genre.models');
const filters = require('../helpers/filter.helpers')

exports.readAllGenre = (req, res) => {
  const sortable = ['name', 'createdAt', 'updatedAt']
  filters(req.query, sortable, selectCountAllGenre, res, (filter, pageInfo) => {
    selectAllGenre(filter, (err, data) => {
      if(err){
        console.log(err)
        return errorHandler(err, res);
      }
      return res.status(200).json({
        succes: true,
        message: 'Database access sucsessfully',
        pageInfo,
        results: data.rows
      });
    });
  });
};

exports.readGenre = (req, res) => {
  selectGenreId(req.params, (err, data) => {
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

exports.createGenre= (req, res) => {
  insertGenre(req.body, (err, data) => {
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

exports.updateGenre = (req, res) => {
  updateGenre(req, (err, data) => {
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

exports.deleteGenre = (req, res) => {
  deletedGenre(req.params, (err, data) => {
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