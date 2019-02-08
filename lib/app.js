const express = require('express');
const app = express();
const connection = require('./middleware/connection');
const { handler } = require('./middleware/error');
const notFound = require('./middleware/notFound');
const tours = require('./routes/tours');

app.use(express.json());

app.use('/tours', connection, tours);

app.use(notFound);
app.use(handler);

module.exports = app;
