import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },

    appendBlog: (state, action) => {
      return state.concat(action.payload)
    },
  },
})

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    await dispatch(setBlogs(blogs))
  }
}

export const createBlogPost = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch(appendBlog(newBlog))
  }
}

export const { setBlogs, appendBlog } = blogsSlice.actions

export default blogsSlice.reducer
