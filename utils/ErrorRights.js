const { ERR_RIGHTS } = require('./consts');

class ErrorRights extends Error {
  constructor(message) {
    super(message);
    this.name = 'RightsError';
    this.statusCode = ERR_RIGHTS;
  }
}

module.exports = ErrorRights;
