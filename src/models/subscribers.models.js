const db = require('../helpers/db.helpers')

exports.selectAllSubscribers = (data, cb) => {
  const sql = 'SELECT * FROM "subscribe"';
  db.query(sql, cb);
};

exports.selectSubscribersId = (data, cb) => {
  const sql = 'SELECT * FROM "subscribe" WHERE id=$1';
  const values = [data.id];
  db.query(sql, values, cb);
};

exports.insertSubscribers = (data, cb) => {
  const sql = 'INSERT INTO "subscribe" ("email") VALUES ($1) RETURNING *';
  const value = [data.email];
  db.query(sql, value, cb);
}

exports.updateSubscribers = (data, cb) => {
  const date = new Date();
  const sql = `UPDATE "subscribe" SET "email" = COALESCE(NULLIF($1, ''), "email"), "updatedAt" = $2 WHERE id = $3 RETURNING *`;
  const values = [data.body.email, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedSubscribers = (data, cb) => {
  const sql = 'DELETE FROM "subscribe" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
