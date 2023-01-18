const userModel = require('../models/users.models');
const filters = require('../helpers/filter.helpers');
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode');
const fs = require('fs')

exports.getProfile = (req, res) => {
  const authorization = req.headers.authorization.split(" ")[1];
  const auth = jwt.verify(authorization, "backend-secret");
  const { id } = auth;


  // const result = {
  //   picture: req.body.picture,
  //   firstName: req.body.firstName,
  //   lastName: req.body.lastName,
  //   userId: id,
  // }
  console.log(id)
  userModel.selectUserId(id, (err, data) => {
    // console.log(id);
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


exports.updateProfile = (req, res) => {
  const authorization = req.headers.authorization.split(" ")[1];
  const auth = jwt.verify(authorization, "backend-secret");
  const { id } = auth;
  // console.log(id)
  // console.log(req.file)
  if (req.file) {
    req.body.picture = req.file.filename;
    userModel.selectUserId(id, (err, data) => {
      console.log(data)
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
  userModel.updateUser(id, req.body, (err, data) => {
    if(err){
      return errorHandler(err, res);
    }
    return res.status(200).json({
      succes: true,
      message: 'Users UPDATE sucsessfully',
      results: data.rows[0]
    })
  })
}