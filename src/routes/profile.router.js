const profile = require('express').Router();

const uploaMiddleware = require('../middleware/upload.middleware')
const authMiddleware = require('../middleware/auth.middleware')
const { getProfile , updateProfile } = require('../controllers/profile.controllers')


profile.get('/', getProfile);
profile.patch('/updated', uploaMiddleware , authMiddleware, updateProfile);


module.exports = profile;