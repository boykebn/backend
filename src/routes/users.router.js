const usersRouter = require('express').Router();

const { readAllUsers, readUsers, createUsers, updateUsers, deleteUsers} = require('../controllers/users.controllers');

usersRouter.get('/', readAllUsers);
usersRouter.get('/:id', readUsers);
usersRouter.post('/', createUsers);
usersRouter.patch('/', updateUsers);
usersRouter.delete('/', deleteUsers);

module.exports = usersRouter;