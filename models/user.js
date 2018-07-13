const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  admin: Boolean,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
