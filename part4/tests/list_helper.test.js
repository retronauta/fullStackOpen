const listHelper = require('../utils/list_helper');

test('dummy return one', () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe('total likes', () => {
  const bigList = [
    {
      title: 'blog1',
      author: 'daniel',
      url: 'danielblog.com',
      likes: 16,
      id: '647c83739453a3d4a7c8b93f',
    },
    {
      title: 'blog2',
      author: 'daniela',
      url: 'danielablog.com',
      likes: 17,
      id: '647c83809453a3d4a7c8b941',
    },
    {
      title: 'blog3',
      author: 'lolo',
      url: 'loloblog.com',
      likes: 4,
      id: '647c8717747649f7007b542a',
    },
    {
      title: 'blog4',
      author: 'lola',
      url: 'lolablog.com',
      likes: 2,
      id: '647c8fde901816edd941d896',
    },
    {
      title: 'blog5',
      author: 'lolito',
      url: 'lolitoblog.com',
      likes: 6,
      id: '647c937aaf3748b7d70ae3c0',
    },
  ];

  const listWithOneBlog = [
    {
      title: 'blog1',
      author: 'daniel',
      url: 'danielblog.com',
      likes: 16,
      id: '647c83739453a3d4a7c8b93f',
    },
  ];

  test('of empty list is zero', () => {
    expect(listHelper.totalLikes([])).toBe(0);
  });

  test('when list has only one blog, equals the likes of that', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(16);
  });

  test('of a bigger list is calculated right', () => {
    expect(listHelper.totalLikes(bigList)).toBe(45);
  });
});
