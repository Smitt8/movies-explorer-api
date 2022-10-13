const ERR_NOT_FOUND = 404;
const ERR_BAD_INPUT = 400;
const ERR_AUTH = 401;
const ERR_RIGHTS = 403;
const ERR_UNIQE = 409;
const ERR_SERVER_ERR = 500;
const urlRegex = /^https?:\/\/(www\.)?[\da-z.-]+\.[a-z]{2,}([/\S.-]*)/;

const updSchemaSettings = {
  new: true,
  runValidators: true,
};

module.exports = {
  ERR_NOT_FOUND,
  ERR_BAD_INPUT,
  ERR_SERVER_ERR,
  ERR_AUTH,
  ERR_RIGHTS,
  ERR_UNIQE,
  urlRegex,
  updSchemaSettings,
};
