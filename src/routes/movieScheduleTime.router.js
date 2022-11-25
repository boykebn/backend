const movieScheduleTimeRouter = require('express').Router();

const { readAllMovieScheduleTime, readMovieScheduleTime, createMovieScheduleTime, updateMovieScheduleTime, deleteMovieScheduleTime } = require('../controllers/movieScheduleTime.controllers');

movieScheduleTimeRouter.get('/', readAllMovieScheduleTime);
movieScheduleTimeRouter.get('/:id', readMovieScheduleTime);
movieScheduleTimeRouter.post('/', createMovieScheduleTime);
movieScheduleTimeRouter.patch('/:id', updateMovieScheduleTime);
movieScheduleTimeRouter.delete('/:id', deleteMovieScheduleTime);

module.exports = movieScheduleTimeRouter;