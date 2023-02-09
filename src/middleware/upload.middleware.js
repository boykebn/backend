const multer = require("multer");
const errorHandler = require('../helpers/errorHandler.helpers');
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");


// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads")
//   },
//   filename: (req, file, cb) => {
//     const extention = file.originalname.split('.');
//     const ext = extention[extention.length - 1]
//     const name = `${new Date().getDate()}_${new Date().getTime()}.${ext}`;
//     cb(null, name)
//   }
// });

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "eastick",
    format: async (req, file) => path.extname(file.originalname).slice("1"),
    public_id: (req, file) => {
      const randomNum = Math.round(Math.random() * 90000);
      const fileName = `${randomNum}${Date.now()}`;
      return fileName;
    },
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    return cb(new Error("Only .png, .jpg and .jpeg format allowed"))
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter,
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
  cloudinary
};