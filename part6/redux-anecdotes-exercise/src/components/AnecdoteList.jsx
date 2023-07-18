import { useDispatch, useSelector } from 'react-redux'
import { upvoteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  // const anecdotes = useSelector(state => state.anecdotes)

  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }

    return state.anecdotes.filter(anecdote =>
      anecdote.content.toLowerCase().includes(state.filter)
    )
  })

  const dispatch = useDispatch()
  return (
    <>
      {anecdotes.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(upvoteAnecdote(anecdote.id))}>
              vote
            </button>
          </div>
        </div>
      ))}
    </>
  )
}

export default AnecdoteList
