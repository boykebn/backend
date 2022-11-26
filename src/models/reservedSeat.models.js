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
  const sql = 'INSERT INTO "reservedSeat" ("seatNum", "transactionId") VALUES ($1, $2) RETURNING *';
  const value = [data.seatNum, data.transactionId];
  db.query(sql, value, cb);
}

exports.updateReservedSeat = (data, cb) => {
  const date = new Date();
  const sql = 'UPDATE "reservedSeat" SET "seatNum" = $1, "transactionId" = $2, "updatedAt" = $3 WHERE id = $4 RETURNING *';
  const values = [data.body.seatNum, data.body.transactionId, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedReservedSeat = (data, cb) => {
  const sql = 'DELETE FROM "reservedSeat" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
