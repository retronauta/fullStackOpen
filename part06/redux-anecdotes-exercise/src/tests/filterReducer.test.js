import deepFreeze from 'deep-freeze'
import filterReducer from '../reducers/filterReducer'

describe('filter reducer', () => {
  test('action filter/setFilter returns new state', () => {
    const state = ''
    const action = {
      type: 'filter/setFilter',
      payload: 'a',
    }

    deepFreeze(state)
    const newState = filterReducer(state, action)

    expect(newState).toBe('a')
  })
})
