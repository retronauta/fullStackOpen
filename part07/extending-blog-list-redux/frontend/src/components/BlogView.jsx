import { Button } from 'react-bootstrap'
import Comments from './Comments'

function BlogView({ blog, like, user, remove }) {
  if (!blog) {
    return <em>No blog found</em>
  }

  const canRemove = user && blog.user.username === user.username

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url} target="_blank" rel="noreferrer">
        {blog.url}
      </a>
      <div>
        {blog.likes}
        {'  '}
        <Button variant="primary" onClick={like}>
          Like
        </Button>
      </div>
      <div>Added by {blog.user.name}</div>
      {canRemove && (
        <Button variant="danger" onClick={remove}>
          Remove
        </Button>
      )}

      <Comments blog={blog} />
    </div>
  )
}

export default BlogView
