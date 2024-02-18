import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,

  reducers: {
    createNotification(state, action) {
      const message = action.payload
      return message
    },

    removeNotification(state, action) {
      return ''
    },
  },
})

export const { createNotification, removeNotification } =
  notificationSlice.actions

export const setNotification = (content, time) => {
  return dispatch => {
    dispatch(createNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer
