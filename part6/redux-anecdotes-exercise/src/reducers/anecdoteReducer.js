import { createSlice } from '@reduxjs/toolkit'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],

  reducers: {
    upvoteAnecdote(state, action) {
      const id = action.payload
      const noteToUpdate = state.find(n => n.id === id)
      const upvotedAnecdote = { ...noteToUpdate, votes: noteToUpdate.votes + 1 }

      const newState = state.map(anecdote =>
        anecdote.id === id ? upvotedAnecdote : anecdote
      )

      return newState.sort((a, b) => {
        return b.votes - a.votes
      })
    },

    createAnecdote(state, action) {
      return [...state, action.payload]
    },

    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { upvoteAnecdote, createAnecdote, setAnecdotes } =
  anecdoteSlice.actions
export default anecdoteSlice.reducer
