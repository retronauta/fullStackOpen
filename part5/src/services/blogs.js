import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (updatedObject, id) => {
  const urlId = `${baseUrl}/${id}`;
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(urlId, updatedObject, config);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, setToken, update };
