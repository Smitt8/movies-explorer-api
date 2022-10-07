const ErrorBadInputs = require('./ErrorBadInputs');
const ErrorServerError = require('./ErrorServerError');
const ErrorUnique = require('./ErrorUnique');

const processError = (err, next) => {
  if ((err.kind === 'ObjectId') || (err.name === 'ValidationError')) {
    return next(new ErrorBadInputs('Некорректный запрос'));
  }
  if (err.code === 11000) {
    return next(new ErrorUnique('Пользователь с таким логином уже существует'));
  }
  return next(new ErrorServerError('Ошибка сервера'));
};

module.exports = processError;
