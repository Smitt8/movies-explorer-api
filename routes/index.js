const express = require('express');
const moviesRoutes = require('./movies');
const usersRoutes = require('./users');

const rootRouter = express.Router();

rootRouter.use(usersRoutes);
rootRouter.use(moviesRoutes);

module.exports = rootRouter;
