const usersRouter = require('express').Router();

const { readAllUsers, readUsers, createUsers, updateUsers, deleteUsers} = require('../controllers/users.controllers');

usersRouter.get('/', readAllUsers);
usersRouter.get('/:id', readUsers);
usersRouter.post('/', createUsers);
usersRouter.patch('/:id', updateUsers);
usersRouter.delete('/:id', deleteUsers);

module.exports = usersRouter;