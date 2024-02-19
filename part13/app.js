const express = require('express');
const morgan = require('morgan');
const blogsRouter = require('./controllers/blogs');
const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.use('/api/blogs', blogsRouter);

module.exports = app;
