import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Login from './components/Login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);

      setUsername('');
      setPassword('');
    } catch (exception) {
      alert('wrong credentials');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <>
      {!user && (
        <Login
          password={password}
          username={username}
          setPassword={setPassword}
          setUsername={setUsername}
          handleLogin={handleLogin}
        />
      )}

      {user && (
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} logged in{' '}
            <button onClick={() => window.localStorage.clear()}>logout</button>
          </p>
          {blogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </>
  );
};

export default App;