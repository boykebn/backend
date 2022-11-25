const db = require('../helpers/db.helpers')

exports.selectAllUsers = (data, cb) => {
  const sql = 'SELECT * FROM "users"';
  db.query(sql, cb);
};

exports.selectUserId = (data, cb) => {
  const sql = 'SELECT * FROM "users" WHERE id=$1';
  const values = [data.id];
  db.query(sql, values, cb);
};

exports.insertUser = (data, cb) => {
  const sql = 'INSERT INTO "users" ("picture", "firstName", "lastName", "phoneNUm", "email", "password") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const value = [data.picture, data.firstName, data.lastName, data.phoneNUm, data.email, data.password];
  db.query(sql, value, cb);
}

exports.updateUser = (data, cb) => {
  const date = new Date();
  const sql = 'UPDATE "users" SET "picture" = $1, "firstName" = $2, "lastName" = $3, "phoneNUm" = $4, "email" = $5, "password" = $6, "updatedAt" = $7 WHERE id = $8 RETURNING *';
  const values = [data.body.picture, data.body.firstName, data.body.lastName, data.body.phoneNUm, data.body.email, data.body.password, date, data.params.id];
  db.query(sql, values, cb);
};

exports.deletedUser = (data, cb) => {
  const sql = 'DELETE FROM "users" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
}
