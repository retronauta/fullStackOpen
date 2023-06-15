const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (req, res, next) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  res.json(blogs);
});

blogRouter.post('/', async (req, res, next) => {
  const users = await User.find({});
  const filteredUsers = users.map(u => u.toJSON());
  const randomNumber = Math.floor(Math.random() * filteredUsers.length);
  const randomUser = filteredUsers[randomNumber];
  const user = await User.findById(randomUser.id);

  const { title, url, likes } = req.body;
  const blog = new Blog({
    title,
    author: randomUser.name,
    url,
    likes: likes || 0,
    user: randomUser.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndRemove(id);
  res.status(204).end();
  res.end();
});

blogRouter.put('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, { new: true });
  res.json(updatedBlog);
});

module.exports = blogRouter;
