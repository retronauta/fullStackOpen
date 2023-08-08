import notificationReducer from './reducers/notificationReducer'

const { configureStore } = require('@reduxjs/toolkit')

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
})
