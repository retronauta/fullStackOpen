const listHelper = require('../utils/list_helper');
const supertest = require('supertest');
const helper = require('./test_helper');

test('dummy return one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    expect(listHelper.totalLikes(helper.listWithOneBlog)).toBe(7);
  });

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(helper.initialBlogs)).toBe(36);
  });
});

describe('likes', () => {
  test('blog with most likes', () => {
    expect(listHelper.favoriteBlog(helper.initialBlogs)).toEqual({
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
    });
  });

  test('author with most blogs', () => {
    expect(listHelper.mostBlogs(helper.initialBlogs)).toEqual({
      author: 'Robert C. Martin',
      blogs: 3,
    });
  });

  test('author with most number of likes', () => {
    expect(listHelper.mostLikes(helper.initialBlogs)).toEqual({
      author: 'Edsger W. Dijkstra',
      likes: 17,
    });
  });
});
