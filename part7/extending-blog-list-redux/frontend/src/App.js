import { useState, useEffect, useRef } from 'react'

//* === SERVICIO ===
//* Manejo del login de usarios
import loginService from './services/login'
//* Manejo del local storage
import storageService from './services/storage'

//* === COMPONENTES ===
import LoginForm from './components/Login'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import { useDispatch, useSelector } from 'react-redux'
import { setMessage } from './reducers/notificationReducer'
import {
  createBlogPost,
  deleteBlog,
  initializeBlogs,
  updateLikes,
} from './reducers/blogsReducer'
import { fetchUser, loginUser } from './reducers/userReducer'

const App = () => {
  // const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState('')

  const user2 = useSelector(({ user }) => {
    console.log('user cargado al loguearme', user)
    return user
  })

  const blogFormRef = useRef()

  const dispatch = useDispatch()

  const notification = useSelector(({ notification }) => {
    return notification
  })

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  //* Fetch de los post
  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  //* Carga el user desde localStorage
  useEffect(() => {
    //TODO dispatch user
    // dispatch(fetchUser())
    const user = storageService.loadUser()
    const user2 = JSON.parse(window.localStorage.getItem('blogappUser2'))
    console.log('User de localStorage de estados', user)
    console.log('User de localStorage desde redux', user2)
    setUser(user2)
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
      //TODO debo modificar esta logica para redux
      dispatch(loginUser({ username, password }))
      // console.log(user2)
      //* Se loguea en en la base de datos
      //* Espero un objeto con mi usuario desde el backend
      const user = await loginService.login({ username, password })
      // console.log('User retornado del backend cuando me logueo:', user)
      //* Seteo el estado de user
      setUser(user2)
      // Guardo en el localStorage el usuario
      // dispatch(saveUser(user2))
      storageService.saveUser(user)
      // Ejecuto la funcion para mostrar notificacion
      notifyWith('welcome!')
      // console.log({ user, user2 })
    } catch (e) {
      notifyWith('wrong username or password', 'error')
    }
  }

  //* Deslogueo del usuario
  const logout = async () => {
    // Seteo el usuario a null
    //TODO debo manejar aqui el estado
    setUser(null)
    // Se remueve el usuario del localStorage
    storageService.removeUser()
    localStorage.removeItem('blogappUser2')
    // Notificacion de deslogueo
    notifyWith('logged out')
  }

  const createBlog = async newBlog => {
    dispatch(createBlogPost(newBlog))
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`)
    blogFormRef.current.toggleVisibility()
  }

  const like = async blog => {
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

  // console.log(user2)
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
        {[...blogs].sort(byLikes).map(blog => (
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
