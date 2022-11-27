const db = require('../helpers/db.helpers')

exports.selectAllMovieCasts = (data, cb) => {
  const sql = 'SELECT * FROM "movieCasts"';
  db.query(sql, cb);
};

exports.selectMovieCastsId = (data, cb) => {
  const sql = 'SELECT * FROM "movieCasts" WHERE id=$1';
  const values = [data.id];
  db.query(sql, values, cb);
};

exports.insertMovieCasts = (data, cb) => {
  const sql = 'INSERT INTO "movieCasts" ("movieId", "castsId") VALUES ($1, $2) RETURNING *';
  const value = [data.movieId, data.castsId];
  db.query(sql, value, cb);
}

exports.updateMovieCasts = (data, cb) => {
  const date = new Date();
  const sql = `UPDATE "movieCasts" SET "movieId" = COALESCE(NULLIF($1, ''), "movieId"), "castsId" = COALESCE(NULLIF($2, ''), "castsId"), "updatedAt" = $3 WHERE id = $4 RETURNING *`;
  const values = [data.body.movieId, data.body.castsId, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedMovieCasts = (data, cb) => {
  const sql = 'DELETE FROM "movieCasts" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
