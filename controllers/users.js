const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { updSchemaSettings } = require('../utils/consts');
const ErrorAuth = require('../utils/ErrorAuth');
const ErrorNotFound = require('../utils/ErrorNotFound');
const processError = require('../utils/utils');
const ErrorServerError = require('../utils/ErrorServerError');

const { NODE_ENV, JWT_SECRET } = process.env;

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

  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      email,
      password: hash,
      name,
    });
    user.save().then(() => {
      res.send(user);
    }).catch((err) => processError(err, next));
  }).catch(() => next(new ErrorServerError('Ошибка сервера')));
};

const signin = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      return next(new ErrorAuth('Неверный логин или пароль'));
    }
    return bcrypt.compare(password, user.password).then((isValid) => {
      if (isValid) {
        const token = jwt.sign(
          { _id: user._id },
          NODE_ENV === 'production' ? JWT_SECRET : 'not-very-secret-key',
          { expiresIn: '7d' },
        );
        res.cookie('jwt', token, {
          maxAge: 3600000,
          httpOnly: true,
        });
        return res.send(user);
      }
      return next(new ErrorAuth('Неверный логин или пароль'));
    }).catch(() => next(new ErrorServerError('Ошибка сервера')));
  }).catch((err) => processError(err, next));
};

const signout = (req, res) => {
  res.clearCookie('jwt');
  return res.send({ message: 'Выход выполнен' });
};

const getMe = (req, res, next) => {
  const { _id } = req.user;

  User.findById(_id).then((user) => {
    isExist(user, res, next);
  }).catch((err) => processError(err, next));
};

const updMe = (req, res, next) => {
  const { email, name } = req.body;
  const { _id } = req.user;

  User.findByIdAndUpdate(_id, { email, name }, updSchemaSettings)
    .then((user) => {
      isExist(user, res, next);
    }).catch((err) => processError(err, next));
};

module.exports = {
  getMe,
  updMe,
  signup,
  signin,
  signout,
};
