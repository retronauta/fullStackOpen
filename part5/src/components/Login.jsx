import React from 'react';

const Login = ({
  handleLogin,
  setUsername,
  setPassword,
  username,
  password,
}) => {
  return (
    <div>
      <h1>Log in to application</h1>
      <form onSubmit={handleLogin}>
        <label>username: </label>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        <label>password:</label>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
        <br/>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default Login;
