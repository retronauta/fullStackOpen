import axios from 'axios';
import { Diary, NewDiary } from '../types';
const urlBase = 'http://localhost:3000/api/diaries';

const getAll = () => {
  return axios.get<Diary[]>(urlBase).then(response => response.data);
};

const create = (object: NewDiary) => {
  return axios.post<Diary>(urlBase, object).then(response => {
    return response.data;
  });
};

export default { getAll, create };
