const Blog = require('../models/blog');

const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    console.log(JSON.stringify(blogs, null, 2));
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};

const postBlog = async (req, res) => {
  console.log('body', req.body);
  try {
    const blog = await Blog.create(req.body);
    res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteBlog = async (req, res) => {
  try {
    if (req.blog) {
      await req.blog.destroy();
    } else {
      res.json({ message: 'Blog not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(400).json({ error });
  }
};

const getById = async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
};

const updateLikes = async (req, res) => {
  // console.log({ body: req.body, blog: JSON.stringify(req.blog, null, 2) });
  if (req.blog) {
    req.blog.likes = req.body.likes;
    await req.blog.save();
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
};

module.exports = { getBlogs, postBlog, deleteBlog, getById, updateLikes };
