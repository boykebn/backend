const db = require('../helpers/db.helpers')

exports.selectAllResetPassword = (data, cb) => {
  const sql = 'SELECT * FROM "resetPassword"';
  db.query(sql, cb);
};

exports.selectResetPasswordId = (data, cb) => {
  const sql = 'SELECT * FROM "resetPassword" WHERE id=$1';
  const values = [data.id];
  db.query(sql, values, cb);
};

exports.insertResetPassword = (data, cb) => {
  const sql = 'INSERT INTO "resetPassword" ("email", "userId", "codeUnique") VALUES ($1, $2, $3) RETURNING *';
  const value = [data.email, data.userId, data.codeUnique];
  db.query(sql, value, cb);
};

exports.updateResetPassword = (data, cb) => {
  const date = new Date();
  const sql = `UPDATE "resetPassword" SET "email" = COALESCE(NULLIF($1, ''), "email"), "userId" = COALESCE(NULLIF($2, ''), "userId"), "codeUnique" = COALESCE(NULLIF($3, ''), "codeUnique"), "updatedAt" = $4 WHERE id = $5 RETURNING *`;
  const values = [data.body.email, data.body.userId, data.body.codeUnique, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedResetPassword = (data, cb) => {
  const sql = 'DELETE FROM "resetPassword" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
};
