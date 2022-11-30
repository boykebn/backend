const moviesRouter = require('express').Router();

const { readAllMovies, readMovies, createMovies, updateMovies, deleteMovies, upcoming, nowShowing } = require('../controllers/movies.controllers');

moviesRouter.get('/', readAllMovies);
moviesRouter.get('/upcoming', upcoming);
moviesRouter.get('/nowShowing', nowShowing);
moviesRouter.get('/:id', readMovies);
moviesRouter.post('/', createMovies);
moviesRouter.patch('/:id', updateMovies);
moviesRouter.delete('/:id', deleteMovies);

module.exports = moviesRouter;