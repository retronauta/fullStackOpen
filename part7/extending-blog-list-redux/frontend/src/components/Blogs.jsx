import Togglable from './Togglable'
import NewBlog from './NewBlog'
import { useDispatch, useSelector } from 'react-redux'
import {
  createBlogPost,
  deleteBlog,
  updateLikes,
} from '../reducers/blogsReducer'
import { useRef } from 'react'
import { setMessage } from '../reducers/notificationReducer'
import Blog from './Blog'
import { Link } from 'react-router-dom'

function Blogs({ blogs }) {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const style = {
    marginBottom: 2,
    padding: 5,
    borderStyle: 'solid',
  }

  // const blogs = useSelector(({ blogs }) => blogs)

  const user = useSelector(({ user }) => user)

  const byLikes = (b1, b2) => b2.likes - b1.likes

  const remove = async blog => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    )
    if (ok) {
      notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`)
      dispatch(deleteBlog(blog))
    }
  }

  const notifyWith = (message, type = 'info') => {
    dispatch(setMessage({ message, type }))

    setTimeout(() => {
      dispatch(setMessage({ message: null }))
    }, 3000)
  }
  const createBlog = async newBlog => {
    dispatch(createBlogPost(newBlog))
    notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`)
    blogFormRef.current.toggleVisibility()
  }
  return (
    <div>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <NewBlog createBlog={createBlog} />
      </Togglable>
      <div>
        {[...blogs].sort(byLikes).map(blog => (
          <div style={style} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blogs
