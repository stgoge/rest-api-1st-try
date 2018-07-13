const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
  },
  password: String,
  admin: Boolean,
});

userSchema.pre('save', async function makeSalt() {
  const salt = bcrypt.genSaltSync();
  const passwordHash = bcrypt.hashSync(this.password, salt);
  this.password = passwordHash;
});

userSchema.methods.isValidPassword = function justForLinterName(enteredPassword) {
  return bcrypt.compareSync(enteredPassword, this.password);
};

const User = mongoose.model('user', userSchema);

module.exports = User;
