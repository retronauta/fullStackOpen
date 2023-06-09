const Blog = require('../models/blog');
const helper = require('./test_helper');
const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const api = supertest(app);
let token;

beforeEach(async () => {
  await Blog.deleteMany({});
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog);
    await blogObject.save();
  }

  const credentials = { username: 'admin', password: process.env.password };
  const userLogin = await api.post('/api/login').send(credentials);
  token = userLogin.body.token;
});

describe('when there is initially some notes saved', () => {
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

describe('addition of a new blog', () => {
  test('verifies that http post request creates a new blog post', async () => {
    const newBlogPost = {
      title: 'Use git like a senior engineer',
      url: 'https://medium.com/gitconnected/use-git-like-a-senior-engineer-ef6d741c898e',
      likes: 4,
    };

    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .set('Authorization', `Bearer ${token}`)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const totalBlogs = await api.get('/api/blogs');
    expect(totalBlogs.body).toHaveLength(helper.initialBlogs.length + 1);
  });

  test('verifies if token is provided', async () => {
    const newBlogPost = {
      title: 'Use git like a senior engineer',
      url: 'https://medium.com/gitconnected/use-git-like-a-senior-engineer-ef6d741c898e',
      likes: 4,
    };

    await api.post('/api/blogs').send(newBlogPost).expect(401);
  });

  test('verifies if like property is missing from the request', async () => {
    const newBlogPost = {
      title: 'Use git like a senior engineer',
      url: 'https://medium.com/gitconnected/use-git-like-a-senior-engineer-ef6d741c898e',
    };

    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .set('Authorization', `Bearer ${token}`)
      .expect(400)
      .then(res => {
        expect(res.body.error).toContain('Path `likes` is required');
      });
  });

  test('verifies missing properties', async () => {
    const newBlogPost = {
      title: 'Use git like a senior engineer',
      likes: 2,
    };

    await api
      .post('/api/blogs')
      .send(newBlogPost)
      .set('Authorization', `Bearer ${token}`)
      .expect(400);
  });
});

describe('deletion of a blog', () => {
  test('check deletion of a note', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(204);

    const blogsAtTheEnd = await helper.blogsInDb();

    expect(blogsAtTheEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtTheEnd.map(r => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('updating of a note', () => {
  test('check updated likes', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];

    const updatedBlog = {
      title: blogToUpdate.title,
      url: blogToUpdate.url,
      author: blogToUpdate.author,
      likes: 18,
    };

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200);

    const blogsAtTheEnd = await helper.blogsInDb();

    expect(blogsAtTheEnd[0].likes).toBe(updatedBlog.likes);
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
