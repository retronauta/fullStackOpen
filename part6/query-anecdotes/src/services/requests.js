import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const result = await axios.get(baseUrl)
  // console.log(result.data)
  return result.data
}

export const createAnecdote = async object => {
  await axios.post(baseUrl, object)
}
