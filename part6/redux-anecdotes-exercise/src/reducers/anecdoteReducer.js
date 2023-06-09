import deepFreeze from 'deep-freeze'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = anecdote => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  deepFreeze(state)
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {
    case 'UPVOTE':
      const id = action.payload.id
      const noteToUpdate = state.find(n => n.id === id)
      // console.log({ noteToUpdate, id })
      const upvoteAnecdote = { ...noteToUpdate, votes: noteToUpdate.votes + 1 }
      const sortedState = [...state].sort((a, b) => {
        return b.votes - a.votes
      })
      return sortedState.map(anecdote =>
        anecdote.id === id ? upvoteAnecdote : anecdote
      )

    case 'NEW_ANECDOTE':
      return [...state, action.payload]
    // return state.concat(action.payload)

    default:
      return state
  }

  // return state
}

export const upvoteNote = id => {
  return {
    type: 'UPVOTE',
    payload: { id },
  }
}

export const newAnecdote = content => {
  return {
    type: 'NEW_ANECDOTE',
    payload: { content, id: getId(), votes: 0 },
  }
}

export default reducer
