const { ERR_SERVER_ERR } = require('./consts');

class ErrorServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InternalError';
    this.statusCode = ERR_SERVER_ERR;
  }
}

module.exports = ErrorServerError;
