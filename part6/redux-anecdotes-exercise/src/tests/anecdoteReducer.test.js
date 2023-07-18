import deepFreeze from 'deep-freeze'
import anecdoteReducer from '../reducers/anecdoteReducer'

describe('anecdote reducer', () => {
  test('create new anecdote with action anecdotes/newAnecdote', () => {
    const state = []
    const action = {
      type: 'anecdotes/newAnecdote',
      payload: 'new anecdote created',
    }

    deepFreeze(state)

    const newState = anecdoteReducer(state, action)

    expect(newState).toHaveLength(1)
    expect(newState.map(a => a.content)).toContainEqual('new anecdote created')
  })

  test('return new state with action anecdotes/upvoteAnecdote', () => {
    const state = [{ content: 'anecdotes can be upvoted', id: 1, votes: 0 }]

    const action = {
      type: 'anecdotes/upvoteAnecdote',
      payload: 1,
    }

    deepFreeze(state)

    const newState = anecdoteReducer(state, action)

    expect(newState.map(a => a.votes)).toContainEqual(1)
  })
})
