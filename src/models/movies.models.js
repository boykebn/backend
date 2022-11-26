const db = require('../helpers/db.helpers')

exports.selectAllMovies = (data, cb) => {
  const sql = 'SELECT * FROM "movies"';
  db.query(sql, cb);
};

exports.selectMoviesId = (data, cb) => {
  const sql = 'SELECT * FROM "movies" WHERE id=$1';
  const values = [data.id];
  db.query(sql, values, cb);
};

exports.insertMovies = (data, cb) => {
  const sql = 'INSERT INTO "movies" ("movieTitle", "pictures", "releaseDate", "director", "duration", "synopsis") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const value = [data.movieTitle, data.pictures, data.releaseDate, data.director, data.duration, data.synopsis];
  db.query(sql, value, cb);
}

exports.updateMovies = (data, cb) => {
  const date = new Date();
  const sql = 'UPDATE "movies" SET "movieTitle" = $1, "pictures" = $2, "releaseDate" = $3, "director" = $4, "duration" = $5, "synopsis" = $6, "updatedAt" =$7 WHERE id = $8 RETURNING *';
  const values = [data.body.movieTitle, data.body.pictures, data.body.releaseDate, data.body.director, data.body.duration, data.body.synopsis, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedMovies = (data, cb) => {
  const sql = 'DELETE FROM "movies" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
