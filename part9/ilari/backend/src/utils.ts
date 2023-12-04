import { NewDiaryEntry, Weather, Visibility } from './types';

//* COMPROBACIONES
// Comprobando si el argumento es string. Este retorna un booleano
const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// Comprobamos que es un date
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// Comprobamos que sea del enum Weather. Retorna un booleano.
// A partir de un array de values del enum Weather hacemos un mapeado y comprobamos que nuestro parametro este incluido en el
const isWeather = (param: string): param is Weather => {
  return Object.values(Weather)
    .map(v => v.toString())
    .includes(param);
};

// Comprobarmos que el parametro este dentro del enum Visibility, este retorna un booleano
const isVisibility = (param: string): param is Visibility => {
  return Object.values(Visibility)
    .map(v => v.toString())
    .includes(param);
};

//* PARSEADORES
// Parseamos el comentario, realizando las comprobaciones correspondientes
const parseComment = (comment: unknown): string => {
  if (!isString(comment)) {
    throw new Error('Incorrect or missing comment');
  }
  return comment;
};

// Parseamos el date, comprobamos el tipo de argumento y si es o no un date
const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }
  return date;
};

// Parseamos el weather, este retorma un valor del enum Weather
// Hacemos las comprobaciones necesarias de que sea un string y sea un enum weather
const parseWeather = (weather: unknown): Weather => {
  if (!isString(weather) || !isWeather(weather)) {
    throw new Error('Incorrect weather: ' + weather);
  }
  return weather;
};

// Parseamos visibility y nos retorna un valor del enum Visibility
// Hacemos comprobaciones de que el parametro sea string y pertenezca al enum Visibility
const parseVisibility = (visibility: unknown): Visibility => {
  if (!isString(visibility) || !isVisibility(visibility)) {
    throw new Error('Incorrect visibility: ' + visibility);
  }
  return visibility;
};

// Funcion que comprueba todas las propiedades de la nueva entrada de diario con ayuda de los pareseadores y retorna un objeto de tipo NewDiaryEntry
const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  // Comprobando que el parametro sea un objeto
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  // La propiedad in retorna true si la propiedad especificada esta en el objeto especificado
  if (
    'comment' in object &&
    'date' in object &&
    'weather' in object &&
    'visibility' in object
  ) {
    const newEntry: NewDiaryEntry = {
      weather: parseWeather(object.weather),
      visibility: parseVisibility(object.visibility),
      date: parseDate(object.date),
      comment: parseComment(object.comment),
    };

    return newEntry;
  }

  throw new Error('Incorrect data: a field missing');
};

export default toNewDiaryEntry;
