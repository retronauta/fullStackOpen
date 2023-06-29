import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Login from './components/Login';
import NewPostForm from './components/NewPostForm';
import Notification from './components/Notification';
import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState(null);

  //* GET all blog post from the database
  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [blogs]);

  //* Verifica si ya existe un token almacenado en localstorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      blogService.setToken(user.token);
      setUser(user);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);

      setUsername('');
      setPassword('');
    } catch (exception) {
      setMessage('wrong username or password');
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setUsername('');
      setPassword('');
    }
  };

  const createPost = async event => {
    event.preventDefault();
    try {
      const blogObject = { title: title, url: url, author: author };
      const response = await blogService.create(blogObject);
      setMessage(`a new blog ${response.title} added`);
      setTimeout(() => {
        setMessage(null);
      }, 3000);
      setTitle('');
      setUrl('');
      setAuthor('');
    } catch (exception) {
      setTitle('');
      setUrl('');
      setAuthor('');
    }
  };

  const styleError = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  const successStyle = {
    color: 'green',
    background: 'lightgreen',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px',
  };

  return (
    <>
      {!user && (
        <>
          <Login
            password={password}
            username={username}
            setPassword={setPassword}
            setUsername={setUsername}
            handleLogin={handleLogin}
            errorMessage={message}
            style={styleError}
          />
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

          <h2>Create new</h2>

          <NewPostForm
            title={title}
            url={url}
            createPost={createPost}
            setTitle={setTitle}
            setUrl={setUrl}
            author={author}
            setAuthor={setAuthor}
          />

          {blogs.map(blog => (
            <Blog blog={blog} key={blog.id} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;
