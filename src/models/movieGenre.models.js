const db = require('../helpers/db.helpers')

exports.selectAllMovieGenre = (data, cb) => {
  const sql = 'SELECT * FROM "movieGenre"';
  db.query(sql, cb);
};

exports.selectMovieGenreId = (data, cb) => {
  const sql = 'SELECT * FROM "movieGenre" WHERE id=$1';
  const values = [data.id];
  db.query(sql, values, cb);
};

exports.insertMovieGenre = (data, cb) => {
  const sql = 'INSERT INTO "movieGenre" ("email", "userId", "codeUnique") VALUES ($1, $2, $3) RETURNING *';
  const value = [data.email, data.userId, data.codeUnique];
  db.query(sql, value, cb);
}

exports.updateMovieGenre = (data, cb) => {
  const date = new Date();
  const sql = 'UPDATE "movieGenre" SET "email" = $1, "userId" = $2, "codeUnique" = $3 WHERE id = $4 RETURNING *';
  const values = [data.body.email, data.body.userId, data.body.codeUnique, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedMovieGenre = (data, cb) => {
  const sql = 'DELETE FROM "movieGenre" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
