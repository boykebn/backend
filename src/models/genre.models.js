const db = require('../helpers/db.helpers')

exports.selectAllGenre = (data, cb) => {
  const sql = 'SELECT * FROM "genre"';
  db.query(sql, cb);
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
  const sql = 'UPDATE "genre" SET "name" = $1, "updatedAt" = $2 WHERE id = $3 RETURNING *';
  const values = [data.body.name, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedGenre = (data, cb) => {
  const sql = 'DELETE FROM "genre" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
