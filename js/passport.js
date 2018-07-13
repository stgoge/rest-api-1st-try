const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromHeader(process.env.JWT_FIELD),
    secretOrKey: process.env.JWT_SECRET,
  },
  (payload, done) => {
    User.findById(payload.id)
      .then(user => done(null, user));
  },
));

passport.use(new LocalStrategy({}, (username, password, done) => {
  User.findOne({ username })
    .then((user) => {
      done(null, (bcrypt.compareSync(password, user.password)) ? user : false);
    });
}));
