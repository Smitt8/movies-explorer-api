const express = require('express');
const {
  getMe, updMe, signup, signin, signout,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { validateUpdMe, validateSignin, validateSignup } = require('../validate/user');

const usersRoutes = express.Router();

usersRoutes.post('/signup', validateSignup, signup);
usersRoutes.post('/signin', validateSignin, signin);
usersRoutes.use(auth);
usersRoutes.get('/users/me', getMe);
usersRoutes.patch('/users/me', validateUpdMe, updMe);

usersRoutes.post('/signout', signout);

module.exports = usersRoutes;
