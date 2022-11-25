const db = require('../helpers/db.helpers')

exports.selectAllMovieScheduleTime = (data, cb) => {
  const sql = 'SELECT * FROM "movieScheduleTime"';
  db.query(sql, cb);
};

exports.selectMovieScheduleTimeId = (data, cb) => {
  const sql = 'SELECT * FROM "movieScheduleTime" WHERE id=$1';
  const values = [data.id];
  db.query(sql, values, cb);
};

exports.insertMovieScheduleTime = (data, cb) => {
  const sql = 'INSERT INTO "movieScheduleTime" ("email", "userId", "codeUnique") VALUES ($1, $2, $3) RETURNING *';
  const value = [data.email, data.userId, data.codeUnique];
  db.query(sql, value, cb);
}

exports.updateMovieScheduleTime = (data, cb) => {
  const date = new Date();
  const sql = 'UPDATE "movieScheduleTime" SET "email" = $1, "userId" = $2, "codeUnique" = $3 WHERE id = $4 RETURNING *';
  const values = [data.body.email, data.body.userId, data.body.codeUnique, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedMovieScheduleTime = (data, cb) => {
  const sql = 'DELETE FROM "movieScheduleTime" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
