const errorHandler = require('../helpers/errorHandler.helpers');
const { getSchedulesByCity, getSchedulesByMovie } = require('../models/movieDetail.models');



exports.getSchedulesByCity = (req, res) => {
  getSchedulesByCity(req.params.id, req.query.date, (err, result) => {
    if (err) {
      return errorHandler(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Data Movie By City success loaded",
      results: result.rows,
    });
  });
};

exports.getSchedulesByMovieId = (req, res) => {
  getSchedulesByMovie(req.params.id, req.query.date, req.query.city, (err, result) => {
    if (err) {
      return errorHandler(err, res);
    }
    return res.status(200).json({
      success: true,
      message: "Data Schedules succes loaded",
      results: result.rows,
    });
  });
};


