const _ = require('lodash');

const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  if (blogs.length === 0) {
    return 0;
  } else {
    const total = blogs.reduce((prev, cur) => {
      return prev + cur.likes;
    }, 0);
    return total;
  }
};

const favoriteBlog = blogs => {
  const likesArr = blogs.map(blog => blog.likes);
  const maxNumber = Math.max(...likesArr);
  return blogs[likesArr.indexOf(maxNumber)];
};

const mostBlogs = blogs => {
  let result = [];
  const authorNames = blogs.map(blog => blog.author);
  const countBlogs = _.countBy(authorNames);
  Object.keys(countBlogs).forEach(name =>
    result.push({ author: name, blogs: countBlogs[name] })
  );
  let sortResults = result.sort((a, b) => a.blogs - b.blogs);
  return sortResults[result.length - 1];
};

const mostLikes = blogs => {
  let result = [];

  blogs.forEach(blog => {
    const exists = result.find(obj => obj.author === blog.author);
    if (!exists) {
      result.push({ author: blog.author, likes: blog.likes });
    } else {
      const duplicatedAuthorIndex = result.findIndex(
        obj => obj.author === blog.author
      );

      const currentObject = result[duplicatedAuthorIndex];

      result[duplicatedAuthorIndex] = {
        ...result[duplicatedAuthorIndex],
        likes: blog.likes + result[duplicatedAuthorIndex].likes,
      };
    }
  });
  result = _.sortBy(result, [
    function (o) {
      return o.likes;
    },
  ]);
  return result[result.length - 1];
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
