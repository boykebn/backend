const express = require('express');

const app = express();

app.get('/', (req, res) => {
  return res.status(200).json({
    succes: true,
    message: "backend is running well"
  })
});

app.listen(8888, () => {
  console.log('app listening on port 8888');
})
