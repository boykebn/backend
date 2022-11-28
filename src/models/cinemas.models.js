const db = require('../helpers/db.helpers')

exports.selectAllCinemas = (filter, cb) => {
  const sql = `SELECT * FROM "cinemas" WHERE name LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $2 OFFSET $3`;
  const values = [`%${filter.search}%`, filter.limit, filter.offset]
  db.query(sql, values, cb);
};

exports.selectCountAllCinemas = (filter, cb) => {
  const sql = `SELECT COUNT("name") AS "totalData" FROM "cinemas" WHERE name LIKE $1 `;
  const values = [`%${filter.search}%`];
  db.query(sql, values, cb);
};

exports.selectCinemasId = (data, cb) => {
  const sql = 'SELECT * FROM "cinemas" WHERE id=$1';
  const values = [data.id];
  db.query(sql, values, cb);
};

exports.insertCinemas = (data, cb) => {
  const sql = 'INSERT INTO "cinemas" ("picture", "name", "address", "city") VALUES ($1, $2, $3, $4) RETURNING *';
  const value = [data.picture, data.name, data.address, data.city];
  db.query(sql, value, cb);
};

exports.updateCinemas = (data, cb) => {
  const date = new Date();
  const sql = `UPDATE "cinemas" SET "picture" = COALESCE(NULLIF($1, '')::VARCHAR, "picture"), "name" = COALESCE(NULLIF($2, '')::VARCHAR, "name"), "address" = COALESCE(NULLIF($3, '')::VARCHAR, "address"), "city" = COALESCE(NULLIF($4, '')::VARCHAR, "city"), "updatedAt" = $5 WHERE id = $6 RETURNING *`;
  const values = [data.body.picture, data.body.name, data.body.address, data.body.city, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedCinemas = (data, cb) => {
  const sql = 'DELETE FROM "cinemas" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
};
