import axios from 'axios';
import { Diary } from './types';
const urlBase = 'http://localhost:3000/api/diaries';

export const getAllDiaries = () => {
  return axios.get<Diary[]>(urlBase).then(response => response.data);
};
