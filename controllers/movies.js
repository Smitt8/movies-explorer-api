const ErrorRights = require('../utils/ErrorRights');
const Movie = require('../models/movie');
const processError = require('../utils/utils');
const ErrorNotFound = require('../utils/ErrorNotFound');

const getMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({}).then((movies) => {
    res.send(movies.filter((el) => {
      const { owner } = el;
      return owner.equals(_id);
    }));
  }).catch((err) => processError(err, next));
};

const postMovie = (req, res, next) => {
  const {
    country, director, duration, year,
    description, image, trailerLink, nameRU,
    nameEN, thumbnail, movieId,
  } = req.body;

  const movie = new Movie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  });
  movie.owner = req.user._id;

  movie.save().then((m) => {
    res.send(m);
  }).catch((err) => processError(err, next));
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  const { _id } = req.user;
  Movie.findById(id).then((movie) => {
    if (!movie) {
      return next(new ErrorNotFound('Фильм не найден'));
    }
    const { owner } = movie;
    if (owner.equals(_id)) {
      return Movie.deleteOne({ _id: id })
        .then(() => res.send({ message: 'Пост удален' }))
        .catch((err) => processError(err, next));
    }
    return next(new ErrorRights('Недостаточно прав для удаления фильма'));
  })
    .catch((err) => processError(err, next));
};

module.exports = {
  getMovies,
  postMovie,
  deleteMovie,
};
