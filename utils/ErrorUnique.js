const { ERR_UNIQE } = require('./consts');

class ErrorUnique extends Error {
  constructor(message) {
    super(message);
    this.name = 'UniqueError';
    this.statusCode = ERR_UNIQE;
  }
}

module.exports = ErrorUnique;
