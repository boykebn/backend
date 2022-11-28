const db = require('../helpers/db.helpers')

exports.selectAllGenre = (filter, cb) => {
  const sql = `SELECT * FROM "genre" WHERE name LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $2 OFFSET $3`;
  const values = [`%${filter.search}%`, filter.limit, filter.offset]
  db.query(sql, values, cb);
};

exports.selectCountAllGenre = (filter, cb) => {
  const sql = `SELECT COUNT("name") AS "totalData" FROM "genre" WHERE name LIKE $1 `;
  const values = [`%${filter.search}%`];
  db.query(sql, values, cb);
};

exports.selectGenreId = (data, cb) => {
  const sql = 'SELECT * FROM "genre" WHERE id=$1';
  const values = [data.id];
  db.query(sql, values, cb);
};

exports.insertGenre = (data, cb) => {
  const sql = 'INSERT INTO "genre" ("name") VALUES ($1) RETURNING *';
  const value = [data.name];
  db.query(sql, value, cb);
}

exports.updateGenre = (data, cb) => {
  const date = new Date();
  const sql = `UPDATE "genre" SET "name" = COALESCE(NULLIF($1, '')::VARCHAR, "name"), "updatedAt" = $2 WHERE id = $3 RETURNING *`;
  const values = [data.body.name, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedGenre = (data, cb) => {
  const sql = 'DELETE FROM "genre" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
