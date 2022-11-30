const usersRouter = require('express').Router();
const uploadMiddleware = require('../middleware/upload.middleware')

const { readAllUsers, readUsers, createUsers, updateUsers, deleteUsers} = require('../controllers/users.controllers');

usersRouter.get('/', readAllUsers);
usersRouter.get('/:id', readUsers);
usersRouter.post('/', createUsers);
usersRouter.patch('/:id', uploadMiddleware, updateUsers);
usersRouter.delete('/:id', deleteUsers);

module.exports = usersRouter;