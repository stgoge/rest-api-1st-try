const JWT = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const NameExistsError = {
  CODE: 403,
  TEXT: 'Username is already exists',
};

const getUserWithHashedPass = (user) => {
  const hashed = user;
  const salt = bcrypt.genSaltSync();
  hashed.password = bcrypt.hashSync(user.password, salt);
  return hashed;
};

const signToken = user => JWT.sign({
  id: user.id,
  admin: user.admin,
  exp: ((new Date().getTime() / 1000) + (process.env.JWT_EXPIRATION_HOURS * 60 * 60)),
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
