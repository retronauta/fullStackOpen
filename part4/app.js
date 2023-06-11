const express = require('express');
const app = express();
require('express-async-errors');
const cors = require('cors');
const config = require('./utils/config');
const mongoose = require('mongoose');
const blogRouter = require('./controllers/blogs');
const logger = require('./utils/logger');
const middleware = require('./utils/middleware');

mongoose.set('strictQuery', false);

mongoose
  .connect(config.MONGODB_URI)
  .then(response => logger.info('connected to MONGODB'))
  .catch(error => logger.error('Error connecting to database', error.message));

app.use(cors());
app.use(express.json());

app.use(middleware.requestLogger);

app.use('/api/blogs', blogRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);
module.exports = app;
