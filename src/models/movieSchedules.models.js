const db = require('../helpers/db.helpers')

exports.selectAllMovieSchedules = (data, cb) => {
  const sql = 'SELECT * FROM "movieSchedules"';
  db.query(sql, cb);
};

exports.selectMovieSchedulesId = (data, cb) => {
  const sql = 'SELECT * FROM "movieSchedules" WHERE id=$1';
  const values = [data.id];
  db.query(sql, values, cb);
};

exports.insertMovieSchedules = (data, cb) => {
  const sql = 'INSERT INTO "movieSchedules" ("movieId", "cinemaId", "price", "startDate", "endDate") VALUES ($1, $2, $3, $$, $5) RETURNING *';
  const value = [data.movieId, data.cinemaId, data.price, data.startDate, data.endDate];
  db.query(sql, value, cb);
};

exports.updateMovieSchedules = (data, cb) => {
  const date = new Date();
  const sql = `UPDATE "movieSchedules" SET "movieId" = COALESCE(NULLIF($1, ''), "movieId"), "cinemaId" = COALESCE(NULLIF($2, ''), "cinemaId"), "price" = COALESCE(NULLIF($3, ''), "price"), "startDate" = COALESCE(NULLIF($4, ''), "startDate"), "endaDate" = COALESCE(NULLIF($5, ''), "endDate"), "updatedAt" = $6 WHERE id = $7 RETURNING *`;
  const values = [data.body.movieId, data.body.cinemaId, data.body.price, data.body.startDate, data.body.endDate, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedMovieSchedules = (data, cb) => {
  const sql = 'DELETE FROM "movieSchedules" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
};
