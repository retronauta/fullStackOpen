import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

// export const getAnecdotes = () =>
//   axios.get('http://localhost:3001/anecdotes').then(res => {
//     console.log(res.data)
//     return res.data
//   })

export const getAnecdotes = async () => {
  const result = await axios.get('http://localhost:3001/anecdotes')
  // console.log(result.data)
  return result.data
}
