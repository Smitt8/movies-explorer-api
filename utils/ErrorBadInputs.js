const { ERR_BAD_INPUT } = require('./consts');

class ErrorBadInputs extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadInputs';
    this.statusCode = ERR_BAD_INPUT;
  }
}

module.exports = ErrorBadInputs;
