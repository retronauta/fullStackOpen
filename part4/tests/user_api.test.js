const app = require('../app');
const supertest = require('supertest');
const User = require('../models/user');
const mongoose = require('mongoose');
const api = supertest(app);
const helper = require('./test_helper');

describe('users creation', () => {
  test('invalid user is not created', async () => {
    const invalidUser = { username: 'li', name: 'fulano', password: '12345' };
    const response = await api.post('/api/users').send(invalidUser).expect(400);

    expect(response.body.error).toContain('User validation failed');
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});
