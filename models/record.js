const mongoose = require('mongoose');

const { Schema } = mongoose;

const RecordSchema = new Schema({
  userID: String,
  record: String,
  priority: Number,
  status: Number,
});

const Record = mongoose.model('record', RecordSchema);

module.exports = Record;
