const errorHandler = (err, res) => {
  if(err.message.includes('unique constraint "email"')){
    return res.status(400).json({
      succes: false,
      message: 'Email already exist!'
    })
  }
  return res.status(500).json({
    succes: false,
    message: 'Something happend in our backend'
  })
}

module.exports = errorHandler