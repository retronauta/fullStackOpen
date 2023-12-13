import { Gender, NewPatient } from './types';

// comprobar si es un string
const isString = (str: unknown): str is string => {
  return typeof str === 'string' || str instanceof String;
};

// Parsear name
const parseName = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Name is not a string');
  }
  return name;
};

// Comprobar que tenga formato de fecha
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// Parsear date
const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Is not a date');
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) {
    throw new Error('Ssn is not a string');
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) {
    throw new Error('Occupation is not a string');
  }
  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Bad value for gender');
  }
  return gender;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender)
    .map(v => v.toString())
    .includes(param);
};

// const parseEntries = (entries: Entry[]): Entry[] => {
//   return entries;
// };


const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if (
    'name' in object &&
    'dateOfBirth' in object &&
    'ssn' in object &&
    'gender' in object &&
    'occupation' in object &&
    'entries' in object
  ) {
    const newPatient: NewPatient = {
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      name: parseName(object.name),
      ssn: parseSsn(object.ssn),
      entries: [],
    };
    return newPatient;
  }
  throw new Error('Incorrect data: Some fields are missing');
};

export default toNewPatientEntry;
