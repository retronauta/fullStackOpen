import { createSlice } from '@reduxjs/toolkit'
import storageService from '../services/storage'
import loginService from '../services/login'
const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    resetUser: (state, action) => {
      return null
    },
  },
})

export const fetchUser = () => {
  return async dispatch => {
    const user = storageService.loadUser()
    dispatch(setUser(user))
  }
}

export const loginUser = credentials => {
  return async dispatch => {
    const user = await loginService.login(credentials)
    storageService.saveUser(user)
    dispatch(setUser(user))
  }
}

export const logoutUser = () => {
  return async dispatch => {
    storageService.removeUser()
    dispatch(resetUser())
  }
}

export const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer
