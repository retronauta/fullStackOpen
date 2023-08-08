import { useState, useEffect, useRef } from 'react'

//* === servicios ===

//* Manejo de los post de blog
import blogService from './services/blogs'
//* Manejo del login de usarios
import loginService from './services/login'
//* Manejo del local storage
import storageService from './services/storage'

//* === componentes ===
import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from './reducers/notificationReducer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState('')

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  const notification = useSelector(({ notification }) => {
    return notification
  })

  //* Carga el user desde localStorage
  useEffect(() => {
    const user = storageService.loadUser()
    setUser(user)
  }, [])

  //* Carga los post desde la base de datos
  useEffect(() => {
    blogService.getAll().then(blogs => setBlogs(blogs))
  }, [])

  //* Manejo de notificacion y su tipo
  const notifyWith = (message, type = 'info') => {
    dispatch(setMessage({ message, type }))

    setTimeout(() => {
      dispatch(setMessage({ message: null }))
    }, 3000)
  }

  const login = async (username, password) => {
    try {
      // Espero un objeto con mi usuario desde el backend
      const user = await loginService.login({ username, password })
      // Seteo el estado de user
      setUser(user)
      // Guardo en el localStorage el usuario
      storageService.saveUser(user)
      // Ejecuto la funcion para mostrar notificacion
      notifyWith('welcome!')
    } catch (e) {
      notifyWith('wrong username or password', 'error')
    }
  }

  //* Deslogueo del usuario
  const logout = async () => {
    // Seteo el usuario a null
    setUser(null)
    // Se remueve el usuario del localStorage
    storageService.removeUser()
    // Notificacion de deslogueo
    notifyWith('logged out')
  }

  const createBlog = async newBlog => {
    const createdBlog = await blogService.create(newBlog)
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`)
    setBlogs(blogs.concat(createdBlog))
    blogFormRef.current.toggleVisibility()
  }

  const like = async blog => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    const updatedBlog = await blogService.update(blogToUpdate)
    notifyWith(`A like for the blog '${blog.title}' by '${blog.author}'`)
    setBlogs(blogs.map(b => (b.id === blog.id ? updatedBlog : b)))
  }

  const remove = async blog => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    )
    if (ok) {
      await blogService.remove(blog.id)
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

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

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>
      <Notification info={notification} />
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {blogs.sort(byLikes).map(blog => (
          <Blog
            key={blog.id}
            blog={blog}
            like={() => like(blog)}
            canRemove={user && blog.user.username === user.username}
            remove={() => remove(blog)}
          />
        ))}
      </div>
    </div>
  )
}

export default App
