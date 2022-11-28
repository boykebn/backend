const errorHandler = (err, res) => {
  console.log(err)
  if(err.message.includes('unique constraint "email"')){
    return res.status(400).json({
      succes: false,
      message: 'Email already exist!'
    });
  }
  if(err.message.includes('not present in table "movies".')){
    if(err.message.includes('key (movieId)')){
      return res.status(400).json({
        succes: false,
        message: 'movieId not found!'
      });
    }
  }
  return res.status(500).json({
    succes: false,
    message: 'Something happend in our backend'
  });
}

module.exports = errorHandler