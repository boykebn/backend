const db = require('../helpers/db.helpers')

exports.getSchedulesByCity = async (id, date, cb) => {
  try {
    const sql = `
    SELECT c.city AS name
    FROM "movieSchedules" ms
    JOIN cinemas c ON ms."cinemaId" = c.id
    JOIN movies m on ms."movieId" = m.id
    JOIN "movieScheduleTime" mt on ms.id = mt."movieSchedulesId"
    WHERE m.id = $1
    AND (COALESCE(NULLIF($2, '')::DATE, CURRENT_DATE) BETWEEN ms."startDate" AND ms."endDate")
    GROUP BY c.city`;
    const values = [id, date];
    db.query(sql, values, cb);
  } catch (err) {
    cb(err, null);
  }
};


exports.getSchedulesByMovie = async (id, city, date, cb) => {
  try {
    const sql = `SELECT ms.id as movieScheduleId, c.id, c.picture, c.name, c.address, c.city, ms.price, string_to_array(string_agg(DISTINCT mt.time::VARCHAR, ', '), ', ') as time
    FROM "movieSchedules" ms
    JOIN cinemas c ON ms."cinemaId" = c.id
    JOIN movies m ON ms."movieId" = m.id
    JOIN "movieScheduleTime" mt ON ms.id = mt."movieSchedulesId"
    WHERE m.id = $1 AND c.city = $2
    AND (COALESCE(NULLIF($3, '')::DATE, CURRENT_DATE) BETWEEN ms."startDate" AND ms."endDate")
    GROUP BY c.id, ms.price, ms.id`;
    const values = [id, city, date];
    db.query(sql, values, cb);
  } catch (err) {
    cb(err, null);
  }
};