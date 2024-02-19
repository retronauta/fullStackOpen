const { QueryTypes } = require('sequelize');
const { sequelize } = require('./models/blogs');
const command = 'SELECT * FROM blogs';

const fetchBlogs = async () => {
  try {
    const blogs = await sequelize.query(command, { type: QueryTypes.SELECT });

    blogs.forEach(blog => {
      const { author, title, likes } = blog;
      console.log(`${author}: ${title}, ${likes} likes`);
    });

    sequelize.close();
  } catch (error) {
    console.error(error);
  }
};

fetchBlogs();

// Executing (default): SELECT * FROM blogs
// Dan Abramov: 'On let vs const', 0 likes
// Laurenz Albe: 'Gaps in sequences in PostgreSQL', 0 likes
