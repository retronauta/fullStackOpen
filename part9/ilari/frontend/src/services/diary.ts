import axios from 'axios';
import { Diary, NewDiary, ValidationError } from '../types';
const urlBase = 'http://localhost:3000/api/diaries';

const getAll = async (): Promise<Diary[]> => {
  const response = await axios.get<Diary[]>(urlBase);
  return response.data;

  // promesas
  // return axios.get<Diary[]>(urlBase).then(response => response.data);
};

const create = async (object: NewDiary) => {
  try {
    const response = await axios.post<Diary>(urlBase, object);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError<ValidationError, Record<string, unknown>>(error)) {
      return error;
    } else {
      console.error(error);
    }
  }

  // Promesas
  // return axios.post<Diary>(urlBase, object).then(response => {
  //   return response.data;
  // });
};

export default { getAll, create };
