import { useState } from 'react'

const Blog = ({ blog, updateLikes, loggedUser, removePost }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const [visible, setVisible] = useState(false)
  const hiddenWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const name = blog.user.name
  const idUser = blog.user.id
  const loggedUserName = loggedUser.name

  const buttonStyle = {
    background: 'red',
    color: 'white',
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const update = () => {
    const { author, id, likes, title, url } = blog
    const plusLike = likes + 1
    const updatedBlog = {
      author,
      id,
      likes: plusLike,
      title,
      url,
      user: idUser,
    }
    updateLikes(updatedBlog)
  }

  const remove = () => {
    const confirm = window.confirm(`Remove blog: ${blog.title}`)
    if (confirm) removePost(blog.id)
  }

  return (
    <div style={blogStyle}>
      <div style={hiddenWhenVisible} className="firstRender">
        {blog.title} | {blog.author}{' '}
        <button onClick={toggleVisibility}>view</button>
      </div>

      <div style={showWhenVisible} className="completePost">
        {blog.title} | {blog.author}{' '}
        <button onClick={toggleVisibility}>hide</button> <br />
        {blog.url} <br />
        {blog.likes} <button onClick={update}>like</button> <br />
        {name} <br />
        {name === loggedUserName && (
          <button style={buttonStyle} onClick={remove}>
            remove
          </button>
        )}
      </div>
    </div>
  )
}

export default Blog
