import { useEffect } from 'react'

import { Route, Routes, useMatch } from 'react-router-dom'

//* === COMPONENTES ===
import LoginForm from './components/Login'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { fetchUser, loginUser, logoutUser } from './reducers/userReducer'
import Users from './components/Users'
import Blogs from './components/Blogs'
import User from './components/User'
import { initializeUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  //* Fetch de los post y carga user desde localStorage
  useEffect(() => {
    dispatch(fetchUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const notification = useSelector(({ notification }) => {
    return notification
  })

  const user = useSelector(({ user }) => {
    return user
  })

  const users = useSelector(({ users }) => {
    return users
  })

  //* Manejo de notificacion y su tipo
  const notifyWith = (message, type = 'info') => {
    dispatch(setMessage({ message, type }))

    setTimeout(() => {
      dispatch(setMessage({ message: null }))
    }, 3000)
  }

  const login = async (username, password) => {
    try {
      dispatch(loginUser({ username, password }))
      notifyWith('welcome!')
    } catch (e) {
      notifyWith('wrong username or password', 'error')
    }
  }

  //* Deslogueo del usuario
  const logout = async () => {
    dispatch(logoutUser())
    notifyWith('logged out')
  }

  const match = useMatch('/users/:id')

  const userInfo = match
    ? users.find(user => user.id === match.params.id)
    : null

  //* Si el usuario no esta presente se va a la ventana de logueo
  if (!user) {
    return (
      <div>
        <h2>log in to application</h2>
        <Notification info={notification} />
        <LoginForm login={login} />
      </div>
    )
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification info={notification} />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>

      <Routes>
        <Route path="/users/:id" element={<User userInfo={userInfo} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/" element={<Blogs />} />
      </Routes>
    </div>
  )
}

export default App
