const mongoose = require('mongoose');

const { Schema } = mongoose;

const RecordSchema = new Schema({
  username: String,
  record: String,
  priority: {
    type: Number,
    default: 0,
  },
  status: {
    type: Number,
    default: 0,
  },
});

const Record = mongoose.model('record', RecordSchema);

module.exports = Record;
