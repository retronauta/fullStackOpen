import axios from "axios";

const url = "https://studies.cs.helsinki.fi/restcountries/";

const getAllCountries = () => {
  const request = axios.get(`${url}api/all`);
  return request.then(response => response.data);
};

export default { getAllCountries };
