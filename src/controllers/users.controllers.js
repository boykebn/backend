const { selectAllUsers, selectUserId, insertUser, updateUser, deletedUser, selectCountAllUsers } = require('../models/users.models');
const errorHandler = require('../helpers/errorHandler.helpers');
const filters = require('../helpers/filter.helpers');
const fs = require('fs');

exports.readAllUsers = (req, res) => {
  const sortable = ['name', 'createdAt', 'updatedAt'];
  filters(req.query, sortable, selectCountAllUsers, res, (filter, pageInfo) => {
    selectAllUsers(filter, (err, data) => {
      if(err){
        return errorHandler(err, res);
      }
      return res.status(200).json({
        succes: true,
        message: 'List All Users',
        pageInfo,
        results: data.rows
      });
    });
  });
};

exports.readUsers = (req, res) => {
  selectUserId(req.params, (err, data) => {
    if(err){
      console.log(err);
      return errorHandler(err, res);
    }
    return res.status(200).json({
      succes: true,
      message: 'Database by Id access sucsessfully',
      results: data.rows[0]
    })
  })
};

exports.createUsers = (req, res) => {
  insertUser(req.body, (err, data) => {
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

exports.updateUsers = (req, res) => {
  if (req.file) {
    req.body.picture = req.file.filename;
    selectUserId(req.params, (err, data) => {
      if (data.rows.length) {
        const [users] = data.rows;
        if(users.picture) {
          fs.rm('uploads/' + users.picture, { force: true }, (err) => {
            if (err) {
              return errorHandler(err, res);
            }
          });
        }
      }
    })
  }
  updateUser(req.params.id, req.body, (err, data) => {
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

exports.deleteUsers = (req, res) => {
  deletedUser(req.params, (err, data) => {
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