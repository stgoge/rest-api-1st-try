const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET,
  },
  (payload, done) => {
    User.findById(payload.id)
      .then(user => done(null, user))
      .catch(error => done(error, false));
  },
));

passport.use(new LocalStrategy({}, (username, password, done) => {
  User.findOne({ username })
    .then((user) => {
      if (user.isValidPassword(password)) done(null, user);
      done(null, false);
    });
}));
