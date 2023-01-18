const profile = require('express').Router();

const uploaMiddleware = require('../middleware/upload.middleware')
const { getProfile , updateProfile } = require('../controllers/profile.controllers')


profile.get('/', getProfile);
profile.patch('/updated', uploaMiddleware , updateProfile);


module.exports = profile;