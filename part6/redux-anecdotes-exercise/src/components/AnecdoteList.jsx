import { useDispatch, useSelector } from 'react-redux'
import { upvoted } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }

    return state.anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(state.filter)
    )
  })

  const dispatch = useDispatch()

  const upvote = (id, content, votes) => {
    dispatch(upvoted(id, content, votes))
    const message = `you voted: ${content}`
    dispatch(setNotification(message, 5))
  }
  return (
    <>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() =>
                upvote(anecdote.id, anecdote.content, anecdote.votes)
              }
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
