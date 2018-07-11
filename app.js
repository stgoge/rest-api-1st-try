require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./js/routes');

const app = express();

mongoose.connect(`mongodb://${process.env.DB_PATH}`, { user: process.env.DB_USER, pass: process.env.DB_PASSWORD, dbName: process.env.DB_NAME });
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(router);

app.use((err, req, res, next) => {
  res.status(422).send({ error: err.message });
});
const port = process.env.PORT || 1337;
app.listen(port, () => {
  console.log(`listening on :${port}`);
});