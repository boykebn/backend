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
  const sql = 'INSERT INTO "genre" ("email", "userId", "codeUnique") VALUES ($1, $2, $3) RETURNING *';
  const value = [data.email, data.userId, data.codeUnique];
  db.query(sql, value, cb);
}

exports.updateGenre = (data, cb) => {
  const date = new Date();
  const sql = 'UPDATE "genre" SET "email" = $1, "userId" = $2, "codeUnique" = $3 WHERE id = $4 RETURNING *';
  const values = [data.body.email, data.body.userId, data.body.codeUnique, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedGenre = (data, cb) => {
  const sql = 'DELETE FROM "genre" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
