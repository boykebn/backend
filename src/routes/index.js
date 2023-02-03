// const authMiddleware = require('../middleware/auth.middleware');

const routes = require('express').Router();

routes.use('/users', require('./users.router'));
routes.use('/transaction', require('./transaction.router'));
routes.use('/subscribers', require('./subscribers.router'));
routes.use('/status', require('./status.router'));
routes.use('/resetPassword', require('./resetPassword.router'));
routes.use('/reservedSeat', require('./reservedSeat.router'));
routes.use('/paymentMethod', require('./paymentMethod.router'));
routes.use('/movieSchedulesTime', require('./movieScheduleTime.router'));
routes.use('/movieSchedules', require('./movieSchedules.router'));
routes.use('/movieDetails', require('./movieDetail.router'))
routes.use('/movieGenre', require('./movieGenre.router'));
routes.use('/movieCasts', require('./movieCasts.router'));
routes.use('/movies', require('./movies.router'));
routes.use('/genre', require('./genre.router'));
routes.use('/cinemas', require('./cinemas.router'));
routes.use('/casts', require('./casts.router'));

routes.use('/profile', require('./profile.router'));
routes.use('/auth', require('./auth.router'));

module.exports = routes;
