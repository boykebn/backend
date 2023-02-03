const moviesDetailsRouter = require('express').Router();
const { getSchedulesByCity, getSchedulesByMovieId } = require('../controllers/movieDetails.controllers');


moviesDetailsRouter.get('/:id/schedules/city', getSchedulesByCity);
moviesDetailsRouter.get('/:id/schedules', getSchedulesByMovieId)



module.exports = moviesDetailsRouter;