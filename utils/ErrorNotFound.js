const { ERR_NOT_FOUND } = require('./consts');

class ErrorNotFound extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
    this.statusCode = ERR_NOT_FOUND;
  }
}

module.exports = ErrorNotFound;
