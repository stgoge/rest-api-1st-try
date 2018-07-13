const JWT = require('jsonwebtoken');
const User = require('../models/user');

const signToken = user => JWT.sign({
  id: user.id,
  admin: user.admin,
  exp: ((new Date().getTime() / 1000) + (process.env.JWT_EXPIRATION_HOURS * 60 * 60)),
}, process.env.JWT_SECRET);

module.exports = {
  signUp: (req, res) => {
    const { username, password } = req.value.body;
    User.findOne({ username })
      .then((userName) => {
        if (userName) {
          res.status(403).json({ error: 'Username is already exists' });
        } else {
          const newUser = new User({ username, password, admin: false });
          newUser.save()
            .then(() => res.status(200).json({ token: signToken(newUser) }))
            .catch(error => res.status(403).json(error));
        }
      });
  },
  signIn: (req, res) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
};
