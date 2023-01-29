const userModel = require('../models/users.models');
const resetPasswordModel = require('../models/resetPassword.models');
const jwt = require('jsonwebtoken')
const errorHandler = require('../helpers/errorHandler.helpers');


exports.login = (req, res) => {
  userModel.selectUserByEmail(req.body.email, (err, { rows: user }) => {
    if (err) {
      return errorHandler(err, res);
    }
    if (user.length) {
      const [users] = user;
      if (req.body.password === users.password) {
        const token = jwt.sign({id: users.id}, 'backend-secret')
        return res.status(200).json({
          success: true,
          message: 'Login success',
          results: { token }
        })
      }
    }
    return res.status(401).json({
      success: false,
      message: 'Wrong Email or Password'
    });
  });
};

exports.register = (req, res) => {
  userModel.insertUser(req.body, (err, data) => {
    // console.log(err);
    if (err) {
      return errorHandler(err, res);
    }
    const { rows: user } = data;
    const [users] = user;
    const token = jwt.sign( {id: users.id }, "backend-secret");

    return res.status(200).json({
      succes: true,
      message: 'Register Success',
      results: {token}
    });
  });
};


exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  userModel.selectUserByEmail(email, (err, { rows: user }) => {
    console.log(user)
    if (err) {
      return errorHandler(err, res);
    }
    if (user.length) {
      const [users] = user;
      const data = {
        email,
        userId: users.id,
        codeUnique: Math.ceil(Math.random() * 90000)
      }
      resetPasswordModel.insertResetPassword(data, (err, {rows: results}) => {
        if (results.length) {
          return res.status(200).json({
            success: true,
            message: 'Reset Password has been requested'
          });
        }
      });
    }else {
      return res.status(400).json({
        success: false,
        message: 'User Not Found!'
      })
    }
  });
};


exports.resetPassword = (req, res) => {
  const { password, confirmPassword } = req.body;
  // console.log(req.body)
  if (password === confirmPassword) {
    resetPasswordModel.selectResetPasswordByEmailAndCode(req.body, (err, { rows: user }) => {
      if (err) {
        return errorHandler(err, res);
      }
      try {
        if (user.length) {
          // console.log(user)
          const [resetRequest] = user;
          if (new Date(resetRequest.createdAt).getTime() + 15 * 60 * 1000 < new Date().getTime()) {
            throw Error('backend error: code_expired')
          }
          userModel.updateUser(resetRequest.userId, { password }, (err, { rows: user }) => {
            if (err) {
              return errorHandler(err, res);
            }
            if (user.length) {
              // console.log(user.length)
              resetPasswordModel.deletedResetPassword(resetRequest.id, (err, { rows }) => {
                if (rows.length) {
                  return res.status(200).json({
                    success: true,
                    message: 'Password succes updated, please relogin'
                  });
                }
              });
            }
          });
        }else {
          throw Error('backend error: notfound_code_request')
        }
      }catch(err) {
        return errorHandler(err, res);
      }
    });
  }else {
    return res.status(400).json({
      success: false,
      message: 'password and confirm password not match'
    });
  }
};