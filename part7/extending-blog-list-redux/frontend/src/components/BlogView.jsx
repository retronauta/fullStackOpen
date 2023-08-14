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
        {blog.likes} <button onClick={like}>like</button>{' '}
      </div>
      <div>Added by {blog.user.name}</div>
      {canRemove && <button onClick={remove}>delete</button>}

      <Comments />
      <ul>
        {blog.comments.map(({ comment }) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogView
