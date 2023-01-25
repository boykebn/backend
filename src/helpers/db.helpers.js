const { Pool } = require('pg'); //

// const db = new Pool({
//   host:'localhost',
//   port:'5432',
//   password:'1',
//   users:'posgres',
//   database:'eastick',
// });


const db = new Pool({
  // connectionString: 'postgresql://postgres:1@localhost:5432/eastick'
  connectionString: process.env.DATABASE_URL
})

db.connect((err) => {
  if(err) {
    console.log('database is not connect')
  }else{
    console.log('database is connect')
  }
});

module.exports = db