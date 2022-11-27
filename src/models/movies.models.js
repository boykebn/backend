const db = require('../helpers/db.helpers')

exports.selectAllMovies = (filter, cb) => {
  const sql = `SELECT * FROM "movies" WHERE name LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $2 OFFSET $3`;
  const values = [`%${filter.search}%`, filter.limit, filter.offset]
  db.query(sql, values, cb);
};

exports.selectCountAllMovies = (filter, cb) => {
  const sql = `SELECT COUNT("movieTitle") AS "totalData" FROM "movies" WHERE movieTitle LIKE $1 `;
  const values = [`%${filter.search}%`];
  db.query(sql, values, cb);
};

exports.selectMoviesId = (data, cb) => {
  const sql = 'SELECT * FROM "movies" WHERE id=$1';
  const values = [data.id];
  db.query(sql, values, cb);
};

exports.insertMovies = (data, cb) => {
  const sql = 'INSERT INTO "movies" ("movieTitle", "pictures", "releaseDate", "director", "duration", "synopsis") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const value = [data.movieTitle, data.pictures, data.releaseDate, data.director, data.duration, data.synopsis];
  db.query(sql, value, cb);
}

exports.updateMovies = (data, cb) => {
  const date = new Date();
  const sql = `UPDATE "movies" SET "movieTitle" = COALESCE(NULLIF($1, ''), "movieTittle"), "pictures" = COALESCE(NULLIF($2, ''), "pictures"), "releaseDate" = COALESCE(NULLIF($3, ''), "releaseDate"), "director" = COALESCE(NULLIF($4, ''), "director"), "duration" = COALESCE(NULLIF($5, ''), "duration"), "synopsis" = COALESCE(NULLIF($6, ''), "synopsis"), "updatedAt" =$7 WHERE id = $8 RETURNING *`;
  const values = [data.body.movieTitle, data.body.pictures, data.body.releaseDate, data.body.director, data.body.duration, data.body.synopsis, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedMovies = (data, cb) => {
  const sql = 'DELETE FROM "movies" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
