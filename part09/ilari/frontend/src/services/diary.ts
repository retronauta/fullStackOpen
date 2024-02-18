import axios from 'axios';
import { Diary, NewDiary } from '../types';

const urlBase = 'http://localhost:3000/api/diaries';

const getAll = async (): Promise<Diary[]> => {
  const response = await axios.get<Diary[]>(urlBase);
  return response.data;
};

const create = async (object: NewDiary): Promise<Diary> => {
  const response = await axios.post<Diary>(urlBase, object);
  return response.data;
};

export default { getAll, create };
