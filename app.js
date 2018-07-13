require('dotenv').config();
require('./controllers/create-admin')();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('./js/routes');

const app = express();
const port = process.env.PORT || 1337;

mongoose.connect(`mongodb://${process.env.DB_PATH}`, { user: process.env.DB_USER, pass: process.env.DB_PASSWORD, dbName: process.env.DB_NAME });
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(router);

app.use((err, req, res) => {
  res.status(process.env.INTERNAL_ERROR_CODE).send({ error: err.message });
});

app.listen(port, () => {
  console.log(`listening on :${port}`);
});
