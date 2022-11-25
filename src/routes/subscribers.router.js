const subscribersRouter = require('express').Router();

const { readAllSubscribers, readSubscribers, createSubscribers, updateSubscribers, deleteSubscribers } = require('../controllers/subscribers.controllers');

subscribersRouter.get('/', readAllSubscribers);
subscribersRouter.get('/:id', readSubscribers);
subscribersRouter.post('/', createSubscribers);
subscribersRouter.patch('/:id', updateSubscribers);
subscribersRouter.delete('/:id', deleteSubscribers);

module.exports = subscribersRouter;