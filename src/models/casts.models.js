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
  const sql = 'INSERT INTO "casts" ("name") VALUES ($1) RETURNING *';
  const value = [data.name];
  db.query(sql, value, cb);
}

exports.updateCasts = (data, cb) => {
  const date = new Date();
  const sql = 'UPDATE "casts" SET "name" = $1, "updatedAt" = $2 WHERE id = $3 RETURNING *';
  const values = [data.body.name, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedCasts = (data, cb) => {
  const sql = 'DELETE FROM "casts" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
