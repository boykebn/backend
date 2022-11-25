const db = require('../helpers/db.helpers')

exports.selectAllCinemas = (data, cb) => {
  const sql = 'SELECT * FROM "cinemas"';
  db.query(sql, cb);
};

exports.selectCinemasId = (data, cb) => {
  const sql = 'SELECT * FROM "cinemas" WHERE id=$1';
  const values = [data.id];
  db.query(sql, values, cb);
};

exports.insertCinemas = (data, cb) => {
  const sql = 'INSERT INTO "cinemas" ("email", "userId", "codeUnique") VALUES ($1, $2, $3) RETURNING *';
  const value = [data.email, data.userId, data.codeUnique];
  db.query(sql, value, cb);
}

exports.updateCinemas = (data, cb) => {
  const date = new Date();
  const sql = 'UPDATE "cinemas" SET "email" = $1, "userId" = $2, "codeUnique" = $3 WHERE id = $4 RETURNING *';
  const values = [data.body.email, data.body.userId, data.body.codeUnique, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedCinemas = (data, cb) => {
  const sql = 'DELETE FROM "cinemas" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
