import axios from 'axios'

const baseUrl = '/api/users'

const getAll = async () => {
  const users = await axios.get(baseUrl)
  return users.data
}

//eslint-disable-next-line
export default { getAll }
