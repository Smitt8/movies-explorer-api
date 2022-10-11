require('dotenv').config();
const { errors } = require('celebrate');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errorHandler } = require('./middlewares/errors');
const ErrorNotFound = require('./utils/ErrorNotFound');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const apiLimiter = require('./middlewares/rate');
const rootRouter = require('./routes');

const {
  PORT = 3000,
  FRONT_URL = 'http://localhost:3000',
  DB_URL = 'localhost:27017',
  DB_NAME = 'moviesdb',
} = process.env;

const app = express();

async function main() {
  await mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });

  mongoose.set('toObject', { useProjection: true });
  mongoose.set('toJSON', { useProjection: true });

  app.use(requestLogger);
  app.use(apiLimiter);
  app.use(
    cors({
      origin: FRONT_URL,
      credentials: true,
    }),
  );

  app.use(express.json());
  app.use(cookieParser());

  app.use('/api', rootRouter);
  app.use((req, res, next) => {
    next(new ErrorNotFound('Страница не найдена'));
  });

  app.use(errorLogger);
  app.use(errors());
  app.use(errorHandler);

  await app.listen(PORT);

  console.log(`Listening on port ... [:${PORT}]`);
}

main();
