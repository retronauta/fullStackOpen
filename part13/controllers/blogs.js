const router = require('express').Router();
const { Blog } = require('../models');
const blogService = require('../services/blogs');

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get('/ping', (req, res) => {
  res.status(200).send('pong');
});

router.get('/', blogService.getBlogs);
router.get('/:id', blogFinder, blogService.getById);
router.post('/', blogService.postBlog);
router.delete('/:id', blogFinder, blogService.deleteBlog);

module.exports = router;
