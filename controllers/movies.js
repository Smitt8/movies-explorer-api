const ErrorRights = require('../utils/ErrorRights');
const Movie = require('../models/movie');
const processError = require('../utils/utils');

const getMovies = (req, res, next) => {
  Movie.find({}).then((movies) => {
    console.log(movies);
    res.send(movies.map((el) => el));
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
  movie.owner = '63405645bfeb481c583e7391'; //req.user._id;

  movie.save().then((m) => {
    res.send(m);
  }).catch((err) => processError(err, next));
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;
  const { _id } = '63405645bfeb481c583e7391'; //req.user;
  Movie.findById(id).then((movie) => {
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
