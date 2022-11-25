const db = require('../helpers/db.helpers')

exports.selectAllReservedSeat = (data, cb) => {
  const sql = 'SELECT * FROM "reservedSeat"';
  db.query(sql, cb);
};

exports.selectReservedSeatId = (data, cb) => {
  const sql = 'SELECT * FROM "reservedSeat" WHERE id=$1';
  const values = [data.id];
  db.query(sql, values, cb);
};

exports.insertReservedSeat = (data, cb) => {
  const sql = 'INSERT INTO "reservedSeat" ("email", "userId", "codeUnique") VALUES ($1, $2, $3) RETURNING *';
  const value = [data.email, data.userId, data.codeUnique];
  db.query(sql, value, cb);
}

exports.updateReservedSeat = (data, cb) => {
  const date = new Date();
  const sql = 'UPDATE "reservedSeat" SET "email" = $1, "userId" = $2, "codeUnique" = $3 WHERE id = $4 RETURNING *';
  const values = [data.body.email, data.body.userId, data.body.codeUnique, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedReservedSeat = (data, cb) => {
  const sql = 'DELETE FROM "reservedSeat" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
