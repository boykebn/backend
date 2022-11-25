const db = require('../helpers/db.helpers')

exports.selectAllTransaction = (data, cb) => {
  const sql = 'SELECT * FROM "transaction"';
  db.query(sql, cb);
};

exports.selectTransactionId = (data, cb) => {
  const sql = 'SELECT * FROM "transaction" WHERE id=$1';
  const values = [data.id];
  db.query(sql, values, cb);
};

exports.insertTransaction = (data, cb) => {
  const sql = 'INSERT INTO "transaction" ("bookingDate", "movieId", "cinemaId", "movieSchedulesId", "fullName", "phoneNUm", "statusId",) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const value = [data.bookingDate, data.movieId, data.cinemaId, data.movieSchedulesId, data.fullName, data.phoneNUm, data.statusId];
  db.query(sql, value, cb);
}

exports.updateTransaction = (data, cb) => {
  const date = new Date();
  const sql = 'UPDATE "transaction" SET "bookingDate" = $1, "movieId" = $2, "cinemaId" = $3, "movieSchedulesId" = $4, "fullName" = $5, "phoneNUm" = $6,"statusId", "updatedAt" = $7 WHERE id = $8 RETURNING *';
  const values = [data.body.bookingDate, data.body.movieId, data.body.cinemaId, data.body.movieSchedulesId, data.body.fullName, data.body.phoneNUm, data.body.statusId, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedTransaction = (data, cb) => {
  const sql = 'DELETE FROM "transaction" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
