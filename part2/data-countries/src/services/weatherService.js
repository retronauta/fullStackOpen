import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const url = `https://api.openweathermap.org/data/2.5/weather?`;

const getWeather = (lat, lon) => {
  const request = axios.get(
    `${url}lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
  );
  return request;
};

export default { getWeather };
