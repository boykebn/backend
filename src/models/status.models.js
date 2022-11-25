const db = require('../helpers/db.helpers')

exports.selectAllStatus = (data, cb) => {
  const sql = 'SELECT * FROM "status"';
  db.query(sql, cb);
};

exports.selectStatussId = (data, cb) => {
  const sql = 'SELECT * FROM "status" WHERE id=$1';
  const values = [data.id];
  db.query(sql, values, cb);
};

exports.insertStatus = (data, cb) => {
  const sql = 'INSERT INTO "status" ("name") VALUES ($1) RETURNING *';
  const value = [data.name];
  db.query(sql, value, cb);
}

exports.updateStatus = (data, cb) => {
  const date = new Date();
  const sql = 'UPDATE "status" SET "name" = $1 WHERE id = $8 RETURNING *';
  const values = [data.body.name, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedStatus = (data, cb) => {
  const sql = 'DELETE FROM "status" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
