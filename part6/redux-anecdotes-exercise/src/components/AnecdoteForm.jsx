import { useDispatch } from 'react-redux'
// import anecdoteService from '../services/anecdotes'
import {
  removeNotification,
  setNotification,
} from '../reducers/notificationReducer'

import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))

    const notificationMessage = `new anecdote created: ${content}`
    dispatch(setNotification(notificationMessage))
    setTimeout(() => {
      dispatch(removeNotification(''))
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm
