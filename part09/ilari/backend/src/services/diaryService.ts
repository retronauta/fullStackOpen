import diaryData from '../../data/entries';

import {
  NonSensitiveDiaryEntry, DiaryEntry, NewDiaryEntry
 } from '../types';

const diaries: DiaryEntry[] = diaryData;

// Obtener todas las entradas de diario
const getEntries = (): DiaryEntry[] => {
  return diaries;
};

// Obtener un array de entradas de diario sin propiedad comment
// Mapea los diarios y retorna todas las propiedades menos comment
const getNonSensitiveEntries = (): NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,
    date,
    weather,
    visibility,
  }));
};

// Busca entradas por su id. Este retorna un DiaryEntry o undefined
const findById = (id: number): DiaryEntry | undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
};

// Pushea un objeto (NewDiaryEntry) al array de diaries
const addDiary = ( entry: NewDiaryEntry ): DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id)) + 1,
    ...entry
  };

  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

export default {
  getEntries,
  addDiary,
  getNonSensitiveEntries,
  findById
};
