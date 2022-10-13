const { Joi, celebrate } = require('celebrate');
const val = require('validator');

const validatePostMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom((value, helpers) => {
      if (val.isURL(value)) {
        return value;
      }
      return helpers.message('Поле image заполнено неверно');
    }),
    trailerLink: Joi.string().required().custom((value, helpers) => {
      if (val.isURL(value)) {
        return value;
      }
      return helpers.message('Поле trailerLink заполнено неверно');
    }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (val.isURL(value)) {
        return value;
      }
      return helpers.message('Поле thumbnail заполнено неверно');
    }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  validatePostMovie,
  validateDeleteMovie,
};
