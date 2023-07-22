import { useMutation, useQuery, useQueryClient } from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes, upvoteAnecdote } from './services/requests'

const App = () => {
  const handleVote = anecdote => {
    const updatedObject = {
      content: anecdote.content,
      votes: anecdote.votes + 1,
      id: anecdote.id,
    }
    newUpvoteMutation.mutate(updatedObject)
  }

  const queryClient = useQueryClient()

  const { isError, data } = useQuery('anecdotes', getAnecdotes, {
    retry: false,
  })

  // const result = useQuery('anecdotes', getAnecdotes)

  const anecdotes = data

  const newUpvoteMutation = useMutation(upvoteAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
  })

  if (isError) {
    return <p>anecdote service not available due to problems in server</p>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes?.map(anecdote => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
