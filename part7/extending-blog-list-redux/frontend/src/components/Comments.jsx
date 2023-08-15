import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogsReducer'
import { Button } from 'react-bootstrap'

function Comments({ blog }) {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = async event => {
    event.preventDefault()
    // const newComments = [...blog.comments, { comment: comment }]
    const blogToUpdate = {
      ...blog,
      user: blog.user.id,
      comments: [...blog.comments, { comment }],
    }
    setComment('')
    dispatch(addComment(blogToUpdate))
  }

  return (
    <>
      <h2>Comments</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Add your comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        {'  '}
        <Button variant="primary" type="submit">
          Add comment
        </Button>
      </form>
      <br />
      <ul>
        {blog.comments.map(({ comment }) => (
          <li key={comment}>{comment}</li>
        ))}
      </ul>
    </>
  )
}

export default Comments
