const blogsRouter = require('express').Router();

const blogService = require('../services/blogs');

blogsRouter.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

blogsRouter.get('/blogs', blogService.getBlogs);

module.exports = blogsRouter;
