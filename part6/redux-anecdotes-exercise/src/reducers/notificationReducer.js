import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationSlice = createSlice({
  name: 'notification',
  initialState,

  reducers: {
    displayNotification(state, action) {
      const message = action.payload
      return message
    },
  },
})

export const { displayNotification } = notificationSlice.actions
export default notificationSlice.reducer
