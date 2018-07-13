const Record = require('../models/record');

const SUCCESS_MESSAGE = 'Done!';

const getQuery = (req) => {
  const query = {};
  if (!req.user.admin) query.userID = req.user.id;
  if (req.query.priority) query.priority = req.query.priority;
  if (req.query.status) query.status = req.query.status;
  if (req.params.id) query.id = req.params.id;
  console.log(query);
  return query;
};

module.exports = {
  create: (req, res, next) => {
    req.body.userID = req.user.id;
    Record.create(req.body).then(res.send(SUCCESS_MESSAGE)).catch(next);
  },

  read: (req, res) => {
    Record.find(getQuery(req)).then(records => res.send(records));
  },

  update: (req, res) => {
    console.log(req.body);
    Record.findOneAndUpdate(getQuery(req), req.body).then((record) => {
      console.log(record);
      res.send(SUCCESS_MESSAGE);
    });
  },

  delete: (req, res) => {
    Record.findOneAndRemove(getQuery(req)).then(res.send(SUCCESS_MESSAGE));
  },
};
