const router = require('express').Router();
//const express = require('express');
//router.use(express.json());

const cardsRouter = require('./cards');
const usersRouter = require('./users');
const NotFound = require('../errors/NotFound');
const auth = require('../middlewares/auth');
const { createUser, login } = require('../controllers/users');
const { loginValidation, createUserValidation } = require('../middlewares/validationJoi');

routes.post('/signin', loginValidation, login);
routes.post('/signup', createUserValidation, createUser);

router.use('/cards', auth,  cardsRouter);
router.use('/users', auth, usersRouter);
router.use((req, res, next) => {
  next(new NotFound('Такой страницы не существует'));
});

module.exports = router;
