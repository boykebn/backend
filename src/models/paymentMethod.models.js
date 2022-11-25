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
  const sql = 'INSERT INTO "paymentMethod" ("email", "userId", "codeUnique") VALUES ($1, $2, $3) RETURNING *';
  const value = [data.email, data.userId, data.codeUnique];
  db.query(sql, value, cb);
}

exports.updatePaymentMethod = (data, cb) => {
  const date = new Date();
  const sql = 'UPDATE "paymentMethod" SET "email" = $1, "userId" = $2, "codeUnique" = $3 WHERE id = $4 RETURNING *';
  const values = [data.body.email, data.body.userId, data.body.codeUnique, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedPaymentMethod = (data, cb) => {
  const sql = 'DELETE FROM "paymentMethod" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
