const Blog = require('../models/blogs');

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
    return res.json(blog);
  } catch (error) {
    res.status(400).json({ error });
  }
};

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findByPk(id);
  try {
    if (blog) {
      await Blog.destroy({
        where: {
          id: id,
        },
      });
      res.json({ success: true });
    } else {
      res.json({ sucess: false });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { getBlogs, postBlog, deleteBlog };
