const db = require('../helpers/db.helpers')

exports.selectAllTransaction = (filter, cb) => {
  const sql = `SELECT * FROM "transaction" WHERE "fullName" LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $2 OFFSET $3`;
  const values = [`%${filter.search}%`, filter.limit, filter.offset]
  db.query(sql, values, cb);
};

exports.selectCountAllTransaction = (filter, cb) => {
  const sql = `SELECT COUNT("fullName") AS "totalData" FROM "transaction" WHERE "fullName" LIKE $1 `;
  const values = [`%${filter.search}%`];
  db.query(sql, values, cb);
};

exports.selectTransactionId = (id, cb) => {
  const sql = `SELECT c.picture,
  t."bookingDate",
  t.time,
  m."movieTitle",
  string_agg(DISTINCT g.name,', ') AS genre,
  string_agg(DISTINCT rs."seatNum",', ') AS SeatNum,
  t.id
  FROM transaction t
  JOIN cinemas c ON t."cinemaId" = c.id
  JOIN movies m ON t."movieId" = m.id
  JOIN "movieGenre" mg ON mg."movieId" = m.id
  JOIN genre g ON g.id = mg."genreId"
  JOIN "reservedSeat" rs ON rs."transactionId" = t.id
  WHERE t."userId"=$1
  GROUP BY c.picture, t."bookingDate", t.time, m."movieTitle", t.id`;
  const values = [id];
  db.query(sql, values, cb);
};

exports.insertTransaction = (data, cb) => {
  const sql = 'INSERT INTO "transaction" ("bookingDate", "movieId", "cinemaId", "movieSchedulesId", "fullName", "phoneNUm", "statusId",) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *';
  const value = [data.bookingDate, data.movieId, data.cinemaId, data.movieSchedulesId, data.fullName, data.phoneNUm, data.statusId];
  db.query(sql, value, cb);
};

exports.orderedTransaction = async (data, cb) => {
  try{
    await db.query("BEGIN")

    const sql = 'INSERT INTO "transaction" ("userId", "bookingDate", "movieId", "cinemaId", "movieSchedulesId", "fullName", "email", "phoneNUm", "statusId", "paymentMethodId", "seatNum", "time", "totalPrice") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *';
    const values = await db.query(sql, [data.userId, data.bookingDate, data.movieId, data.cinemaId, data.movieSchedulesId, data.fullName, data.email, data.phoneNUm, data.statusId, data.paymentMethodId, data.seatNum, data.time, data.totalPrice]);

    const seats = data.seatNum.map(num => `('${num}', ${sql.rows[0].id})`).join(', ')
    const sqlSeat = `INSERT INTO "reservedSeat" ("seatNum", "transactionId") VALUES ${seats} RETURNING *`;
    const value = await db.query(sqlSeat);

    await db.query("COMMIT")

    const ordered = {
      transaction: values.rows[0],
      reservedSeat: value.rows
    }
    cb(null, ordered)
  }catch(err) {
    await db.query("ROLLBACK")

    cb(err, null)
  }
};

exports.selectOrderedById = async (data) => {
  try {
    const sql = `SELECT m.movieTitle, t."bookingDate", t.time, t."totalPrice", string_agg(DISTINCT "rs"."seatNum",', ') AS seatNum, string_agg(DISTINCT g.name,', ') AS genre FROM transaction t
    JOIN "reservedSeat" "rs" ON t.id = "rs"."transactionId"
    JOIN "cinemas" c ON t."cinemaId" = c.id
    JOIN movies m ON t."movieId" = m.id
    JOIN "movieGenre" mg ON mg."movieId" = m.id
    JOIN genre g ON g.id = mg"genreId"
    WHERE t.id = $1
    GROUP BY c.picture, t."bookingDate", t.time, m.movieTitle, t."totalPrice"`;
    const values = [data.id];
    const results = await db.query(sql, values);
    return results.rows;
  } catch (error) {
    console.log(error)
  }
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
