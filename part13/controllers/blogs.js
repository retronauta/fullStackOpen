const blogsRouter = require('express').Router();

const blogService = require('../services/blogs');

blogsRouter.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

blogsRouter.get('/', blogService.getBlogs);
blogsRouter.post('/', blogService.postBlog);
blogsRouter.delete('/:id', blogService.deleteBlog);

module.exports = blogsRouter;
