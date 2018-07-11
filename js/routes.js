const express = require('express');
const passport = require('passport');
const UsersController = require('../controllers/user');
const RecordsController = require('../controllers/record');
const { validateUserData, schemas } = require('./route-helpers');
require('../passport');

const passportLocal = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const validateUserNamePassword = validateUserData(schemas.authSchema);

const router = express.Router();

router.route('/signup')
  .post(validateUserNamePassword, UsersController.signUp);

router.route('/signin')
  .post(validateUserNamePassword, passportLocal, UsersController.signIn);

router.route('/records')
  .post(passportJWT, RecordsController.create);

router.route('/records')
  .get(passportJWT, RecordsController.read);

router.route('/records/:id')
  .put(passportJWT, RecordsController.update);

router.route('/records/:id')
  .delete(passportJWT, RecordsController.delete);

module.exports = router;
