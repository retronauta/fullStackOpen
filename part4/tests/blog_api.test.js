const Blog = require('../models/blog');
const helper = require('./test_helper');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }
});

describe('blog tests', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  });

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('verifies that identifier of blog is id', async () => {
    const response = await api.get('/api/blogs');
    const id = response.body[0].id;

    expect(id).toBeDefined();
  });

  test('verifies that http post request creates a new blog post', async () => {
    const newBlogPost = {
      title: 'Use git like a senior engineer',
      author: 'Jacob Bennett',
      url: 'https://medium.com/gitconnected/use-git-like-a-senior-engineer-ef6d741c898e',
      likes: 4,
    };

    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const totalBlogs = await api.get('/api/blogs');
    expect(totalBlogs.body).toHaveLength(helper.initialBlogs.length + 1);
  });

  test('verifies if like property is missing from the request', async () => {
    const newBlogPost = {
      title: 'Use git like a senior engineer',
      author: 'Jacob Bennett',
      url: 'https://medium.com/gitconnected/use-git-like-a-senior-engineer-ef6d741c898e',
      likes: 2,
    };

    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    expect(newBlogPost).toHaveProperty('likes');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
