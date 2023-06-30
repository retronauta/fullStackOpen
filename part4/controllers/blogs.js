const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

// const getTokenFrom = req => {
//   const authorization = req.get('authorization');
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '');
//   }

//   return null;
// };

blogRouter.get('/', async (req, res, next) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
    id: 1,
  });
  res.json(blogs);
});

blogRouter.post('/', async (req, res, next) => {
  // const users = await User.find({});
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  // const filteredUsers = users.map(u => u.toJSON());
  // const randomNumber = Math.floor(Math.random() * filteredUsers.length);
  // const randomUser = filteredUsers[randomNumber];
  const user = req.user;

  const { title, url, likes, author } = req.body;

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token invalid' });
  }

  const blog = new Blog({
    title,
    author: author,
    url,
    likes: 0,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog.id);
  await user.save();
  res.status(201).json(savedBlog);
});

blogRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const blogPost = await Blog.findById(id);
  const user = req.user;

  if (!user) {
    res.status(401).json({ error: 'token invalid' });
  }

  if (user._id.toString() === blogPost.user.toString()) {
    await Blog.findByIdAndRemove(id);
    const index = user.blogs.indexOf(blogPost._id);
    let updatedUserBlogs = user.blogs;
    updatedUserBlogs.splice(index, 1);
    user.blogs = updatedUserBlogs;
    await user.save();

    return res.status(204).end();
  }
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
