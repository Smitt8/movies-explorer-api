const jwt = require('jsonwebtoken');

const ErrorAuth = require('../utils/ErrorAuth');

const { NODE_ENV, JWT_SECRET } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'not-very-secret-key');
  } catch (err) {
    next(new ErrorAuth('Пожалуйста авторизуйтесь.'));
  }

  req.user = payload;
  next();
};

module.exports = auth;
