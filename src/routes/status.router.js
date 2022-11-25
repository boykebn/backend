const statusRouter = require('express').Router();

const { readAllStatus, readStatus, createStatus, updateStatus, deleteStatus } = require('../controllers/status.controllers');

statusRouter.get('/', readAllStatus);
statusRouter.get('/:id', readStatus);
statusRouter.post('/', createStatus);
statusRouter.patch('/:id', updateStatus);
statusRouter.delete('/:id', deleteStatus);

module.exports = statusRouter;