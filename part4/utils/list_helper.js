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

module.exports = { dummy, totalLikes, favoriteBlog };
