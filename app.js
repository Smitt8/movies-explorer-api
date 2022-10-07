const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const { errorHandler } = require('./middlewares/errors');
const moviesRoutes = require('./routes/movies');
const usersRoutes = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

async function main() {
  await mongoose.connect('mongodb://localhost:27017/moviesdb', {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  mongoose.set('toObject', { useProjection: true });
  mongoose.set('toJSON', { useProjection: true });

  app.use(express.json());
  app.use(usersRoutes);
  app.use(moviesRoutes);

  app.use(errors());
  app.use(errorHandler);

  await app.listen(PORT);

  console.log(`Listening on port ... [:${PORT}]`);
}

main();
