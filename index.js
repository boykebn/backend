const express = require('express');
const db = require('./src/helpers/db.helpers');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/', require('./src/routes'))


app.get('/', (req, res) => {
  db.query('SELECT * FROM users', (error, results) => {
    if(error) {
      return res.status(500).json({
        succes: false,
        message: "database access failed"
      })
    }else {
      return res.status(200).json({
        succes: true,
        message: "database access succesfully",
        data: results.rows
      });
    }
  });
});




app.listen(8888, () => {
  console.log('app listening on port 8888');
});
