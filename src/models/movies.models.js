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
  const sql = 'INSERT INTO "movies" ("email", "userId", "codeUnique") VALUES ($1, $2, $3) RETURNING *';
  const value = [data.email, data.userId, data.codeUnique];
  db.query(sql, value, cb);
}

exports.updateMovies = (data, cb) => {
  const date = new Date();
  const sql = 'UPDATE "movies" SET "email" = $1, "userId" = $2, "codeUnique" = $3 WHERE id = $4 RETURNING *';
  const values = [data.body.email, data.body.userId, data.body.codeUnique, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedMovies = (data, cb) => {
  const sql = 'DELETE FROM "movies" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
