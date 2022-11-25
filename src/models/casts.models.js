const db = require('../helpers/db.helpers')

exports.selectAllCasts = (data, cb) => {
  const sql = 'SELECT * FROM "casts"';
  db.query(sql, cb);
};

exports.selectCastsId = (data, cb) => {
  const sql = 'SELECT * FROM "casts" WHERE id=$1';
  const values = [data.id];
  db.query(sql, values, cb);
};

exports.insertCasts = (data, cb) => {
  const sql = 'INSERT INTO "casts" ("email", "userId", "codeUnique") VALUES ($1, $2, $3) RETURNING *';
  const value = [data.email, data.userId, data.codeUnique];
  db.query(sql, value, cb);
}

exports.updateCasts = (data, cb) => {
  const date = new Date();
  const sql = 'UPDATE "casts" SET "email" = $1, "userId" = $2, "codeUnique" = $3 WHERE id = $4 RETURNING *';
  const values = [data.body.email, data.body.userId, data.body.codeUnique, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedCasts = (data, cb) => {
  const sql = 'DELETE FROM "casts" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
