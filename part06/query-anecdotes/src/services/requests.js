import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const result = await axios.get(baseUrl)
  return result.data
}

export const createAnecdote = async object => {
  await axios.post(baseUrl, object)
}

export const upvoteAnecdote = async newObject => {
  await axios.put(`${baseUrl}/${newObject.id}`, newObject)
}
