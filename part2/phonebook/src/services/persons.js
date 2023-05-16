import axios from "axios";
const url = "http://localhost:3001/persons";

const getPersons = () => {
  const request = axios.get(url);
  return request.then(response => response.data);
};

const addPerson = newPerson => {
  const request = axios.post(url, newPerson);
  return request.then(response => response.data);
};

const deletePerson = id => {
  axios.delete(`${url}/${id}`);
};

export default { getPersons, addPerson, deletePerson };
