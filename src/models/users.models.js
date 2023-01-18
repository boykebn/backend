const db = require('../helpers/db.helpers')

exports.selectAllUsers = (filter, cb) => {
  const sql = `SELECT * FROM "users" WHERE "firstName" LIKE $1 ORDER BY "${filter.sortBy}" ${filter.sort} LIMIT $2 OFFSET $3`;
  const values = [`%${filter.search}%`, filter.limit, filter.offset]
  db.query(sql, values, cb);
};

exports.selectCountAllUsers = (filter, cb) => {
  const sql = `SELECT COUNT("firstName") AS "totalData" FROM "users" WHERE "firstName" LIKE $1 `;
  const values = [`%${filter.search}%`];
  db.query(sql, values, cb);
};

exports.selectUserByEmail = (email, cb) => {
  const sql = 'SELECT * FROM "users" WHERE email=$1';
  const values = [email];
  db.query(sql, values, cb);
};

exports.selectUserId = (id, cb) => {
  const sql = 'SELECT * FROM "users" WHERE id=$1';
  const values = [id];
  db.query(sql, values, cb);
};


exports.insertUser = (data, cb) => {
  const sql = 'INSERT INTO "users" ("picture", "firstName", "lastName", "phoneNUm", "email", "password") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const value = [data.picture, data.firstName, data.lastName, data.phoneNUm, data.email, data.password];
  db.query(sql, value, cb);
}

exports.updateUser = (id, data, cb) => {
  // const date = new Date();
  const sql = `UPDATE "users" SET "picture" = COALESCE(NULLIF($1, '')::VARCHAR, "picture"), "firstName" = COALESCE(NULLIF($2, '')::VARCHAR, "firstName"), "lastName" = COALESCE(NULLIF($3, '')::VARCHAR, "lastName"), "phoneNUm" = COALESCE(NULLIF($4, '')::VARCHAR, "phoneNUm"), "email" = COALESCE(NULLIF($5, '')::VARCHAR, "email"), "password" = COALESCE(NULLIF($6, '')::VARCHAR, "password") WHERE id = $7 RETURNING *`;
  const values = [data.picture, data.firstName, data.lastName, data.phoneNUm, data.email, data.password, id];
  db.query(sql, values, cb);
};

exports.deletedUser = (data, cb) => {
  const sql = 'DELETE FROM "users" WHERE id = $1 RETURNING *';
  const values = [data.id];
  db.query(sql, values, cb);
};
