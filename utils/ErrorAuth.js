const { ERR_AUTH } = require('./consts');

class ErrorAuth extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
    this.statusCode = ERR_AUTH;
  }
}

module.exports = ErrorAuth;
