const db = require('../helpers/db.helpers')

exports.selectAllTransaction = (filter, cb) => {
  const sql = `SELECT * FROM "transaction" WHERE fullName LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $2 OFFSET $3`;
  const values = [`%${filter.search}%`, filter.limit, filter.offset]
  db.query(sql, values, cb);
};

exports.selectCountAllTransaction = (filter, cb) => {
  const sql = `SELECT COUNT("fullName") AS "totalData" FROM "transaction" WHERE fullName LIKE $1 `;
  const values = [`%${filter.search}%`];
  db.query(sql, values, cb);
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
};

exports.updateTransaction = (data, cb) => {
  const date = new Date();
  const sql = `UPDATE "transaction" SET "bookingDate" = COALESCE(NULLIF($1, ''), "bookingDate"), "movieId" = COALESCE(NULLIF($2, '')::INT, "movieId"), "cinemaId" = COALESCE(NULLIF($3, '')::INT, "cinemaId"), "movieSchedulesId" = COALESCE(NULLIF($4, '')::INT, movieSchedulesId"), "fullName" = COALESCE(NULLIF($5, '')::VARCHAR, "fullName"), "phoneNUm" = COALESCE(NULLIF($6, '')::VARCHAR, "phoneNUm"),"statusId" = COALESCE(NULLIF($7, '')::INT, "statusId"), "updatedAt" = $8 WHERE id = $9 RETURNING *`;
  const values = [data.body.bookingDate, data.body.movieId, data.body.cinemaId, data.body.movieSchedulesId, data.body.fullName, data.body.phoneNUm, data.body.statusId, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedTransaction = (data, cb) => {
  const sql = 'DELETE FROM "transaction" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
};
