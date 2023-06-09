import React, { useState } from 'react'
import Notification from './Notification'
import PropTypes from 'prop-types'

const Login = ({ loginUser, errorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const styleError = {
    color: 'rgb(255, 0, 0)',
    background: 'lightgrey',
  }

  const login = event => {
    event.preventDefault()
    loginUser(username, password)
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h1>Log in to application</h1>
      <Notification message={errorMessage} style={styleError} />
      <form onSubmit={login}>
        <label>username: </label>
        <input
          type="text"
          className="usernameField"
          value={username}
          name="Username"
          // onChange={event => setUsername(event.target.value)}
          onChange={({ target }) => setUsername(target.value)}
        />
        <br />
        <label>password:</label>
        <input
          type="password"
          className="passwordField"
          value={password}
          name="Password"
          // onChange={event => setPassword(event.target.value)}
          onChange={({ target }) => setPassword(target.value)}
        />
        <br />
        <button type="submit">login</button>
      </form>
    </div>
  )
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
}

export default Login
