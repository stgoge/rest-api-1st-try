const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const JWT_EXPIRATION_HOURS = 240;

const NameExistsError = {
  CODE: 403,
  TEXT: 'Username is already exists',
};

const getUserWithHashedPass = (user) => {
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(user.password, salt);
  return user;
};

const signToken = user => JWT.sign({
  id: user.id,
  admin: user.admin,
  exp: (Math.floor(new Date().getTime() / 1000) + (JWT_EXPIRATION_HOURS * 60 * 60)),
}, process.env.JWT_SECRET);

module.exports = {
  signUp: (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username })
      .then((userName) => {
        if (userName) {
          res.status(NameExistsError.CODE).json({ error: NameExistsError.TEXT });
        } else {
          const newUser = new User({ username, password, admin: false });
          getUserWithHashedPass(newUser).save()
            .then(() => res.json({ token: signToken(newUser) }))
            .catch(error => res.status(process.env.INTERNAL_ERROR_CODE).json(error));
        }
      });
  },
  signIn: (req, res) => {
    const token = signToken(req.user);
    res.json({ token });
  },
};
