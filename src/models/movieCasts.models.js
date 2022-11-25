const db = require('../helpers/db.helpers')

exports.selectAllMovieCasts = (data, cb) => {
  const sql = 'SELECT * FROM "movieCasts"';
  db.query(sql, cb);
};

exports.selectMovieCastsId = (data, cb) => {
  const sql = 'SELECT * FROM "movieCasts" WHERE id=$1';
  const values = [data.id];
  db.query(sql, values, cb);
};

exports.insertMovieCasts = (data, cb) => {
  const sql = 'INSERT INTO "movieCasts" ("email", "userId", "codeUnique") VALUES ($1, $2, $3) RETURNING *';
  const value = [data.email, data.userId, data.codeUnique];
  db.query(sql, value, cb);
}

exports.updateMovieCasts = (data, cb) => {
  const date = new Date();
  const sql = 'UPDATE "movieCasts" SET "email" = $1, "userId" = $2, "codeUnique" = $3 WHERE id = $4 RETURNING *';
  const values = [data.body.email, data.body.userId, data.body.codeUnique, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedMovieCasts = (data, cb) => {
  const sql = 'DELETE FROM "movieCasts" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
