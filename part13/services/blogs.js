const Blog = require('../models/blogs');

const getBlogs = async (req, res) => {
  const blogs = await Blog.findAll();

  res.json(blogs);
};

module.exports = { getBlogs };
