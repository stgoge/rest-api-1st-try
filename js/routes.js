const express = require('express');
const passport = require('passport');
const UsersController = require('../controllers/user');
const RecordsController = require('../controllers/record');
const { validateData, schemas } = require('./route-helpers');
require('../passport');

const passportLocal = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });
const validateUserData = validateData(schemas.authSchema);
const validateRecordData = validateData(schemas.recordSchema);

const router = express.Router();

router.route('/signup')
  .post(validateUserData, UsersController.signUp);

router.route('/signin')
  .post(validateUserData, passportLocal, UsersController.signIn);

router.route('/records')
  .post(validateRecordData, passportJWT, RecordsController.create);

router.route('/records')
  .get(passportJWT, RecordsController.read);

router.route('/records/:id')
  .put(validateRecordData, passportJWT, RecordsController.update);

router.route('/records/:id')
  .delete(passportJWT, RecordsController.delete);

module.exports = router;
