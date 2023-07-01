import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Login from './components/Login';
import NewPostForm from './components/NewPostForm';
import Notification from './components/Notification';
import './index.css';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [newChange, setNewChange] = useState(false);

  //* GET all blog post from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogs = await blogService.getAll();
        const sortedBlogs = blogs.sort((a, b) => {
          return b.likes - a.likes;
        });
        setBlogs(sortedBlogs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [newChange]);

  //* Verifica si ya existe un token almacenado en localstorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const successStyle = {
    color: 'green',
    background: 'lightgreen',
  };

  const toggleNewPost = () => {
    setNewChange(!newChange);
  };

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setMessage('wrong username or password');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  const createPost = async (title, author, url) => {
    try {
      const blogObject = { title: title, url: url, author: author };
      const response = await blogService.create(blogObject);
      setMessage(`a new blog ${response.title} added`);
      toggleNewPost();

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    } catch (exception) {
      console.log(exception);
    }
  };

  const updateBlog = async updatedBlog => {
    try {
      const id = updatedBlog.id;
      const objectBlog = {
        user: updatedBlog.user,
        author: updatedBlog.author,
        title: updatedBlog.title,
        url: updatedBlog.url,
        likes: updatedBlog.likes,
      };
      await blogService.update(objectBlog, id);
      toggleNewPost();
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <>
      {!user && (
        <>
          <Login loginUser={handleLogin} errorMessage={message} />
        </>
      )}

      {user && (
        <div>
          <h2>blogs</h2>
          <Notification message={message} style={successStyle} />
          <p>
            {user.name} logged in
            <button onClick={() => window.localStorage.clear()}>logout</button>
          </p>

          <Togglable buttonLabel="create new blog">
            <NewPostForm createPost={createPost} />
          </Togglable>

          {blogs.map(blog => (
            <Blog blog={blog} key={blog.id} updateLikes={updateBlog} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
