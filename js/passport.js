const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const JWT_FIELD = 'authorization';
const JWT_SECRET = 'somesecreeeet';

passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromHeader(JWT_FIELD),
    secretOrKey: JWT_SECRET,
  },
  (payload, done) => {
    User.findById(payload.id)
      .then(user => done(null, user));
  },
));

passport.use(new LocalStrategy({}, (username, password, done) => {
  User.findOne({ username }).maxTime(1)
    .then((user) => {
      done(null, (bcrypt.compareSync(password, user.password)) ? user : false);
    });
}));
