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
  const sql = 'INSERT INTO "movieSchedules" ("email", "userId", "codeUnique") VALUES ($1, $2, $3) RETURNING *';
  const value = [data.email, data.userId, data.codeUnique];
  db.query(sql, value, cb);
}

exports.updateMovieSchedules = (data, cb) => {
  const date = new Date();
  const sql = 'UPDATE "movieSchedules" SET "email" = $1, "userId" = $2, "codeUnique" = $3 WHERE id = $4 RETURNING *';
  const values = [data.body.email, data.body.userId, data.body.codeUnique, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedMovieSchedules = (data, cb) => {
  const sql = 'DELETE FROM "movieSchedules" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
