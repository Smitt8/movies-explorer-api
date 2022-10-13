const { ERR_SERVER_ERR } = require('../utils/consts');

const errorHandler = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({ message: err.message });
  } else {
    res.status(ERR_SERVER_ERR).send({ message: 'Неизвестная ошибка' });
  }
  next();
};

module.exports = {
  errorHandler,
};
