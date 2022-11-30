const multer = require("multer");
const errorHandler = require('../helpers/errorHandler.helpers');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads")
  },
  filename: (req, file, cb) => {
    const extention = file.originalname.split('.');
    const ext = extention[extention.length - 1]
    const name = `${new Date().getDate()}_${new Date().getTime()}.${ext}`;
    cb(null, name)
  }
});

const upload = multer({
  storage
});

const uploaMiddleware = upload.single('picture')

module.exports = (req, res, next) => {
  uploaMiddleware(req, res, (err) => {
    if (err) {
      console.log(err)
      return errorHandler(err, res);
    }
    next();
  });
};