const userModel = require('../models/users.models');
const jwt = require('jsonwebtoken')


exports.login = (req, res) => {
  userModel.selectUserByEmail(req.body.email, (err, {rows}) => {
    if(rows.length){
      const [users] = rows
      if(req.body.password === users.password){
        const token = jwt.sign({id: users.id}, 'backend-secret')
        return res.status(200).json({
          success: true,
          message: 'Login success',
          results: {
            token
          }
        })
      }
        return res.status(401).json({
          success: false,
          message: 'Wrong Email or Password'
        });
    }
  })
};

exports.register = (req, res) => {
  userModel.insertUser(req.body, (err, data) => {
    if(err){
      return errorHandler(err, res);
    }
    return res.status(200).json({
      succes: true,
      message: 'Account Has been succes created',
      results: data.rows[0]
    })
  })
};