const db = require('../helpers/db.helpers')

exports.selectAllCinemas = (data, cb) => {
  const sql = 'SELECT * FROM "cinemas"';
  db.query(sql, cb);
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
}

exports.updateCinemas = (data, cb) => {
  const date = new Date();
  const sql = 'UPDATE "cinemas" SET "picture" = $1, "name" = $2, "address" = $3, "city" = $4, "updatedAt" = $5 WHERE id = $6 RETURNING *';
  const values = [data.body.picture, data.body.name, data.body.address, data.body.city, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedCinemas = (data, cb) => {
  const sql = 'DELETE FROM "cinemas" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
