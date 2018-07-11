const JWT = require('jsonwebtoken');
const User = require('../models/user');


const signToken = user => JWT.sign({
  // iss: 'wtf',
  // sub: newUser.id,
  // iat: new Date().getTime(),
  // exp: new Date().setDate(new Date().getDate() + 1),
  id: user.id,
  admin: user.admin,
}, process.env.JWT_SECRET);

module.exports = {
  signUp: async (req, res, next) => {
    const { username, password } = req.value.body;

    const FoundUser = await User.findOne({ username });
    if (FoundUser) {
      return res.status(403).json({ error: 'Username is already exists' });
    }

    const newUser = new User({ username, password, admin: false });
    await newUser.save();
    res.status(200).json({ token: signToken(newUser) });
  },
  signIn: async (req, res, next) => {
    const token = signToken(req.user);
    res.status(200).json({ token });
  },
};
