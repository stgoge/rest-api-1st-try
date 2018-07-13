const mongoose = require('mongoose');

const { Schema } = mongoose;

const recordSchema = new Schema({
  userID: String,
  record: String,
  date: Date,
  priority: Number,
  status: Number,
});

const Record = mongoose.model('record', recordSchema);

module.exports = Record;
