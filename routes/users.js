const express = require('express');
const { getMe, updMe, signup } = require('../controllers/users');
const { validateUpdMe } = require('../validate/user');

const usersRoutes = express.Router();

usersRoutes.post('/signup', signup);

usersRoutes.get('/users/me', getMe);
usersRoutes.post('/users/me', validateUpdMe, updMe);

module.exports = usersRoutes;
