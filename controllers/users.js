const User = require('../models/user');
const { updSchemaSettings } = require('../utils/consts');
const ErrorNotFound = require('../utils/ErrorNotFound');
const processError = require('../utils/utils');

const isExist = (user, res, next) => {
  if (user) {
    return res.send(user);
  }
  return next(new ErrorNotFound('Пользователь не существует'));
};

const signup = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  const user = new User({
    email,
    password,
    name,
  });
  user.save().then(() => {
    res.send(user);
  }).catch((err) => processError(err, next));
};

const getMe = (req, res, next) => {
  const { id } = req.user;

  User.findById(id).then((user) => {
    isExist(user, res, next);
  }).catch((err) => processError(err, next));
};

const updMe = (req, res, next) => {
  const { email, name } = req.body;
  const { id } = req.user;

  User.findByIdAndUpdate(id, { email, name }, updSchemaSettings)
    .then((user) => {
      console.log(user);
      isExist(user, res, next);
    }).catch((err) => processError(err, next));
};

module.exports = {
  getMe,
  updMe,
  signup,
};
