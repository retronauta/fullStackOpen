import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

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

    appendAnecdote(state, action) {
      return [...state, action.payload]
    },

    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

export const { upvoteAnecdote, setAnecdotes, appendAnecdote } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
