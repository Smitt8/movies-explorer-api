const express = require('express');
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');
const { validatePostMovie, validateDeleteMovie } = require('../validate/movie');

const moviesRoutes = express.Router();

moviesRoutes.get('/movies', getMovies);
moviesRoutes.post('/movies', validatePostMovie, postMovie);
moviesRoutes.delete('/movies/:id', validateDeleteMovie, deleteMovie);

module.exports = moviesRoutes;
