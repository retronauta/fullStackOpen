import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'

const { configureStore } = require('@reduxjs/toolkit')

export const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    user: userReducer,
  },
})
