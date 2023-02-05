const userModel = require('../models/users.models');
const filters = require('../helpers/filter.helpers');
const jwt = require('jsonwebtoken')
const jwt_decode = require('jwt-decode');
const fs = require('fs');
// const { cloudinary } = require('../middleware/upload.middleware')
const argon = require("argon2");
const errorHandler = require('../helpers/errorHandler.helpers');
const cloudinary = require('cloudinary').v2

exports.getProfile = (req, res) => {
  const authorization = req.headers.authorization.split(" ")[1];
  const auth = jwt.verify(authorization, "backend-secret");
  const { id } = auth;
  console.log(authorization)
  console.log(id)
  userModel.selectUserId(id, (err, data) => {
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
  const id = req.usersData.id
  console.log(authorization)
  console.log(id)
  console.log(req.file)
  if (req.file) {
    req.body.picture = req.file.path;
    // console.log(req.file.path)
    userModel.selectUserId(id, async (err, data) => {
      if (err) {
        return errorHandler(err, res)
      }
      if (data.rows.length) {
        const [users] = data.rows;
        if(users.picture) {
          // console.log(users.picture)
          await cloudinary.uploader.destroy(`eastick/${users.picture}`)
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
      message: 'Users Update sucsessfully',
      results: data.rows[0]
    })
  })
};

// exports.updateUsers = async (req, res) => {
//   try {
//     const user = await userModel.selectUserId(req.userData.id);
//     if (req.file) {
//       console.log(user.picture);
//       if (!user.picture) {
//         user.picture = req.file.path;
//         req.body.pciture = user.picture;
//         console.log("masuk");
//       } else {
//         console.log("masuk lagi")
//         const setPictures = user.picture.split("/");
//         const getNumFormat = setPictures[setPictures.length - 1];
//         const getNumber = getNumFormat.split(".")[0];
//         const getDate = getNumber.split("_")[0];
//         const getNumRandom = getNumber.split("_")[0];
//         const idPicture = `${getDate}_${Number(getNumRandom)}`
//         user.picture = req.file.path;
//         req.body.picture = user.picture;
//         await cloudinary.uploader.destroy(`eastick/${idPicture}`)
//       }
//     }
//     const setUser = await userModel.updateUser(req.body, req.userData.id);
//     const newPassword = await argon.hash(setUser.password);
//     const putPassword = await updatePassword(newPassword, req.userData.id);
//     return res.status(200).json({
//       success: true,
//       message: "Profile updated",
//       results: putPassword,
//     });
//   } catch (error) {
//     return errorHandler(error, res);
//   }
// };

// module.exports = { updateUsers, getProfile };