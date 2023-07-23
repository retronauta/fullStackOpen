import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../services/requests'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [notification, dispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  const onCreate = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (content.length >= 5) {
      dispatch({ type: 'MESSAGE', payload: `anecdote ${content}` })
    }
    // useNotificationDispatch({type: 'MESSAGE'})
    newAnecdoteMutation.mutate(
      { content, votes: 0 },
      {
        onError(err) {
          dispatch({
            type: 'MESSAGE',
            payload: 'too short anecdote, must have length 5 or more',
          })
        },
      }
    )
    setTimeout(() => {
      dispatch({ type: 'MESSAGE', payload: '' })
    }, 5000)
    // console.log('new anecdote')
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
