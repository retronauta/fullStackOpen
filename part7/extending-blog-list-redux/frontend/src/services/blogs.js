import axios from 'axios'
import storageService from '../services/storage'
const baseUrl = '/api/blogs'

//* configuracion de los headers
const headers = {
  Authorization: storageService.loadUser()
    ? `Bearer ${storageService.loadUser().token}`
    : null,
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async object => {
  //! Aqui habia un error de autorizacion con el header
  // const config = {
  // headers: { Authorization: `Bearer ${storageService.loadUser().token}` },
  // }
  const request = await axios.post(baseUrl, object, { headers })
  // const request = await axios.post(baseUrl, object, config)
  return request.data
}

const update = async object => {
  const request = await axios.put(`${baseUrl}/${object.id}`, object, {
    headers,
  })
  return request.data
}

const remove = async id => {
  await axios.delete(`${baseUrl}/${id}`, { headers })
}

// eslint-disable-next-line
export default { getAll, create, update, remove }
