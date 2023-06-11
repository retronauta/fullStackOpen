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
});

afterAll(async () => {
  await mongoose.connection.close();
});
