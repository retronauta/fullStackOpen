import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null, type: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state = { ...action.payload }
      // const stateReadable = JSON.parse(JSON.stringify(state))
      return state
    },
  },
})

export const { setMessage } = notificationSlice.actions

export default notificationSlice.reducer
