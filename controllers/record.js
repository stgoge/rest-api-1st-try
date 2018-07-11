const Record = require('../models/record');

module.exports = {
  create: (req, res, next) => {
    req.body.username = req.user.username;
    Record.create(req.body).then((task) => {
      res.send(task);
    }).catch(next);
  },
  read: (req, res, next) => {
    const query = {};
    if (!req.user.admin) { query.username = req.user.username; }
    if (req.query.priority) { query.priority = req.query.priority; }
    if (req.query.status) { query.status = req.query.status; }
    Record.find(query).then((records) => {
      res.send(records);
    });
  },
  update: (req, res, next) => {
    const query = {
      _id: req.params.id,
    };
    if (!req.user.admin) { query.username = req.user.username; }
    Record.findOneAndUpdate(query, req.body).then(() => {
      Record.findOne({ _id: req.params.id }).then((task) => {
        res.send(task);
      });
    });
  },
  delete: (req, res, next) => {
    const query = {
      _id: req.params.id,
    };
    if (!req.user.admin) { query.username = req.user.username; }
    Record.findOneAndRemove(query).then((task) => {
      res.send(task);
    });
  },
};
