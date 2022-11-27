const db = require('../helpers/db.helpers')

exports.selectAllPaymentMethod = (data, cb) => {
  const sql = 'SELECT * FROM "paymentMethod"';
  db.query(sql, cb);
};

exports.selectPayementMethodId = (data, cb) => {
  const sql = 'SELECT * FROM "paymentMethod" WHERE id=$1';
  const values = [data.id];
  db.query(sql, values, cb);
};

exports.insertPaymentMethod = (data, cb) => {
  const sql = 'INSERT INTO "paymentMethod" ("picture", "name") VALUES ($1, $2) RETURNING *';
  const value = [data.picture, data.name];
  db.query(sql, value, cb);
}

exports.updatePaymentMethod = (data, cb) => {
  const date = new Date();
  const sql = `UPDATE "paymentMethod" SET "picture" = COALESCE(NULLIF($1, ''), "picture"), "name" = COALESCE(NULLIF($2, ''), "name"), "UpdatedAt" = $3 WHERE id = $4 RETURNING *`;
  const values = [data.body.picture, data.body.name, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedPaymentMethod = (data, cb) => {
  const sql = 'DELETE FROM "paymentMethod" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
