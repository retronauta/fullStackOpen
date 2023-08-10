import { createSlice } from '@reduxjs/toolkit'
import storageServide from '../services/storage'
import loginService from '../services/login'
const initialState = {}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      console.log('payload que viene desde el thunk', action.payload)
      return action.payload
    },
  },
})

export const fetchUser = () => {
  return async dispatch => {
    const user = storageServide.loadUser()
    dispatch(setUser(user))
  }
}

export const loginUser = credentials => {
  console.log('credenciales que llegan en el dispatch del login', credentials)
  return async dispatch => {
    const user = await loginService.login(credentials)

    // storageService.saveUser(user)
    localStorage.setItem('blogappUser2', JSON.stringify(user))
    dispatch(setUser(user))
  }
}

export const { setUser } = userSlice.actions

export default userSlice.reducer
