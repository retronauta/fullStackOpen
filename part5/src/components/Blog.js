import { useState } from 'react';

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  const [visible, setVisible] = useState(false);
  const hiddenWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };
  const name = blog.user.name;

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  return (
    <div style={blogStyle}>
      <div style={hiddenWhenVisible}>
        {blog.title} | {blog.author}{' '}
        <button onClick={toggleVisibility}>view</button>
      </div>

      <div style={showWhenVisible}>
        {blog.title} | {blog.author}{' '}
        <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        {blog.likes} <button>like</button>
        <br />
        {name}
      </div>
    </div>
  );
};

export default Blog;
