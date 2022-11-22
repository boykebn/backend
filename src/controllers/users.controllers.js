exports.readAllUsers = (req, res) => {
  return res.status(200).json({
    succes: true,
    message: 'List data of Users'
  })
};

exports.readUsers = (req, res) => {
  return res.status(200).json({
    succes: true,
    message: 'List details Users'
  })
};


exports.createUsers = (req, res) => {
  return res.status(200).json({
    succes: true,
    message: 'User created succesfully'
  })
};

exports.updateUsers = (req, res) => {
  return res.status(200).json({
    succes: true,
    message: 'User updated succesfully'
  })
};

exports.deleteUsers = (req, res) => {
  return res.status(200).json({
    succes: true,
    message: 'User deleted succesfully'
  })
};