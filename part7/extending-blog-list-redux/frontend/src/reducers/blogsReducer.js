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

    likeBlog: (state, action) => {
      const updatedBlog = action.payload
      return state.map(b => (b.id === updatedBlog.id ? updatedBlog : b))
    },

    removeBlog: (state, action) => {
      const id = action.payload
      return state.filter(b => b.id !== id)
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

export const updateLikes = blog => {
  return async dispatch => {
    const newBlog = await blogService.update(blog)
    dispatch(likeBlog(newBlog))
  }
}

export const deleteBlog = blog => {
  return async dispatch => {
    const { id } = blog
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const { setBlogs, appendBlog, likeBlog, removeBlog } = blogsSlice.actions

export default blogsSlice.reducer
