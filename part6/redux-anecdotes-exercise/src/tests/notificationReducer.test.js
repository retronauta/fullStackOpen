import deepFreeze from 'deep-freeze'
import notificationReducer from '../reducers/notificationReducer'

describe('notification reducer', () => {
  test('set new notification message with action notification/setNotification', () => {
    const state = ''
    const action = {
      type: 'notification/setNotification',
      payload: 'new notification',
    }

    deepFreeze(state)

    const newState = notificationReducer(state, action)
    expect(newState).toBe('new notification')
  })

  test('remove notification message with action notification/removeNotification', () => {
    const state = notificationReducer('', {
      type: 'notification/setNotification',
      payload: 'new message',
    })

    const action = {
      type: 'notification/removeNotification',
      payload: '',
    }

    deepFreeze(state)

    const newState = notificationReducer(state, action)

    expect(newState).toBe('')
  })
})
