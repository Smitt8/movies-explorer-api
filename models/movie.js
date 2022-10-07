const mongoose = require('mongoose');
const { urlRegex } = require('../utils/consts');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: (props) => `${props.value} is not a URL`,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: (props) => `${props.value} is not a URL`,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => urlRegex.test(v),
      message: (props) => `${props.value} is not a URL`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: String,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
