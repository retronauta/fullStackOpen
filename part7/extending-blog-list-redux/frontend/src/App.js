import { useEffect } from 'react'

import { Link, Route, Routes, useMatch, useNavigate } from 'react-router-dom'

//* === COMPONENTES ===
import LoginForm from './components/Login'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from './reducers/notificationReducer'
import {
  deleteBlog,
  initializeBlogs,
  updateLikes,
} from './reducers/blogsReducer'
import { fetchUser, loginUser, logoutUser } from './reducers/userReducer'
import Users from './components/Users'
import Blogs from './components/Blogs'
import User from './components/User'
import { initializeUsers } from './reducers/usersReducer'
import BlogView from './components/BlogView'
import { Button, Nav, Navbar } from 'react-bootstrap'

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

  const blogs = useSelector(({ blogs }) => blogs)

  //* Manejo de notificacion y su tipo
  const notifyWith = (message, type = 'info') => {
    dispatch(setMessage({ message, type }))

    setTimeout(() => {
      dispatch(setMessage({ message: null }))
    }, 3000)
  }

  const navigate = useNavigate()

  const like = async blog => {
    // console.log(blog)
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    dispatch(updateLikes(blogToUpdate))
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`)
  }

  const remove = async blog => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    )
    if (ok) {
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`)
      dispatch(deleteBlog(blog))
      navigate('/')
    }
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

  const matchUser = useMatch('/users/:id')
  const matchBlog = useMatch('/blogs/:id')

  const blogInfo = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  const userInfo = matchUser
    ? users.find(user => user.id === matchUser.params.id)
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
    <div className="container">
      <Navbar>
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users">Users</Link>
          </Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {user.name} logged in
            <Button onClick={logout}>Logout</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>

      <Notification info={notification} />
      <div></div>

      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <BlogView
              blog={blogInfo}
              like={() => like(blogInfo)}
              remove={() => remove(blogInfo)}
              user={user}
            />
          }
        />
        <Route path="/users/:id" element={<User userInfo={userInfo} />} />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/" element={<Blogs blogs={blogs} />} />
      </Routes>
    </div>
  )
}

export default App
