import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async content => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const upvoteAnecdote = async (updateObject, id) => {
  const urlId = `${baseUrl}/${id}`
  const response = await axios.put(urlId, updateObject)
  return response.data
}

// eslint-disable-next-line
export default { getAll, createNew, upvoteAnecdote }
