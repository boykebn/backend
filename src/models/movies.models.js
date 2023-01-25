const db = require('../helpers/db.helpers')

exports.selectAllMovies = (filter, cb) => {
  const sql = `SELECT * FROM "movies" WHERE "movieTitle" LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $2 OFFSET $3`;
  const values = [`%${filter.search}%`, filter.limit, filter.offset]
  db.query(sql, values, cb);
};

exports.selectCountAllMovies = (filter, cb) => {
  const sql = `SELECT COUNT("movieTitle") AS "totalData" FROM "movies" WHERE "movieTitle" LIKE $1 `;
  const values = [`%${filter.search}%`];
  db.query(sql, values, cb);
};

exports.selectMoviesId = (data, cb) => {
  const sql = 'SELECT * FROM "movies" WHERE id=$1';
  const values = [data.id];
  db.query(sql, values, cb);
};

exports.getMoviesId = (id, cb) => {
  const sql = `SELECT m."id", m."pictures", m."movieTitle", string_agg(DISTINCT g.name,', ') AS genre, m."createdAt", m."releaseDate", m."duration", m."director", m."synopsis", string_agg(DISTINCT c.name,', ') AS casts FROM movies m
  JOIN "movieGenre" mg ON m."id" = mg."movieId"
  LEFT JOIN genre g ON mg."genreId" = g."id"
  JOIN "movieCasts" mc ON m.id = mc."movieId"
  LEFT JOIN "casts" c ON mc."castsId" = c.id
  WHERE m."id"= $1
  GROUP BY m."movieTitle",  m.id`;
  const values = [id];
  db.query(sql, values, cb);
};


exports.insertMovies = (data, cb) => {
  const sql = 'INSERT INTO "movies" ("movieTitle", "pictures", "releaseDate", "director", "duration", "synopsis") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const value = [data.movieTitle, data.pictures, data.releaseDate, data.director, data.duration, data.synopsis];
  db.query(sql, value, cb);
}

exports.updateMovies = (id ,data, cb) => {
  const sql = `UPDATE "movies" SET "movieTitle" = COALESCE(NULLIF($1, '')::VARCHAR, "movieTitle"), "pictures" = COALESCE(NULLIF($2, '')::VARCHAR, "pictures"), "releaseDate" = COALESCE(NULLIF($3, '')::DATE, "releaseDate"), "director" = COALESCE(NULLIF($4, '')::VARCHAR, "director"), "duration" = COALESCE(NULLIF($5, '')::TIME WITHOUT TIME ZONE, "duration"), "synopsis" = COALESCE(NULLIF($6, '')::TEXT, "synopsis") WHERE id = $7 RETURNING *`;
  const values = [data.movieTitle, data.pictures, data.releaseDate, data.director, data.duration, data.synopsis, id];
  db.query(sql, values, cb);
};

exports.deletedMovies = (data, cb) => {
  const sql = 'DELETE FROM "movies" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}


exports.upComingMovie =  (filter, cb) => {
  const sql = `SELECT m.id, m.pictures, m."movieTitle", m."releaseDate", m."createdAt", string_agg(g.name,', ') AS "genre" FROM movies m
  JOIN "movieGenre" mg ON mg."movieId" = m.id
  JOIN "genre" g ON g.id = mg."genreId"
  WHERE "movieTitle" LIKE $1 AND
  date_part('year', "releaseDate")::TEXT = COALESCE(NULLIF($2,''), date_part('year', CURRENT_DATE)::TEXT) AND
  date_part('month', "releaseDate")::TEXT = COALESCE(NULLIF($3,''), date_part('month', CURRENT_DATE)::TEXT)
  GROUP BY m.id, m."movieTitle", m."pictures", m."releaseDate", m."createdAt"
  ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $4 OFFSET $5`;
  const values = [`%${filter.search}%`, filter.year, filter.month, filter.limit, filter.offset];
db.query(sql, values, cb);
};

exports.selectFilterUpComing = (filter, cb) => {
  const sql = `SELECT COUNT("movieTitle") AS "totalData" FROM "movies" WHERE "movieTitle" LIKE $1 AND date_part('year', "releaseDate")::TEXT = COALESCE(NULLIF($2,''), date_part('year', CURRENT_DATE)::TEXT) AND
  date_part('month', "releaseDate")::TEXT = COALESCE(NULLIF($3,''), date_part('month', CURRENT_DATE)::TEXT)`;
  const values = [`%${filter.search}%`, filter.year, filter.month];
  db.query(sql, values, cb);
}

exports.nowShowingMovie = (filter, cb) => {
  const sql = `SELECT m.id, m."pictures", m."movieTitle", string_agg(g.name, ', ') AS "genre", ms."startDate", ms."endDate", m."createdAt"
  FROM "movies" m
  JOIN "movieSchedules" ms ON ms."movieId" = m.id
  LEFT JOIN "movieGenre" mg ON mg."movieId" = m.id
  LEFT JOIN "genre" g ON g.id = mg."genreId"
  WHERE current_date BETWEEN ms."startDate" AND ms."endDate" GROUP BY m.id, m."movieTitle", m."pictures", m."releaseDate", ms.id
  ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $1 OFFSET $2`;
  const values = [filter.limit, filter.offset]
  db.query(sql, values, cb);
};

exports.selectFilterNowShowing = (filter, cb) => {
  const sql = `SELECT COUNT("movieTitle") AS "totalData" FROM "movies" m
  JOIN "movieSchedules" ms ON ms."movieId" = m.id
  WHERE "movieTitle" like $1 AND current_date BETWEEN ms."startDate" AND ms."endDate"`;
  const values = [`%${filter.search}%`];
  db.query(sql, values, cb);
};
