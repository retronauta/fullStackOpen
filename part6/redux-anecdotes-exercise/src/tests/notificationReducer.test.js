import deepFreeze from 'deep-freeze'
import notificationReducer from '../reducers/notificationReducer'

describe('notification reducer', () => {
  test('create new anecdote with action notification/displayNotification', () => {
    const state = ''
    const action = {
      type: 'notification/displayNotification',
      payload: 'new notification',
    }

    deepFreeze(state)

    const newState = notificationReducer(state, action)
    expect(newState).toBe('new notification')
  })
})
