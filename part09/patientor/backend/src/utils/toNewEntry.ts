import { Diagnose } from '../types';

const toNewEntry = (object: unknown) => {
  // export interface BaseEntry {
  //   id: string;
  //   description: string;
  //   date: string;
  //   specialist: string;
  //   diagnosisCodes?: Array<Diagnose['code']>;
  // }

  const isString = (str: unknown): str is string => {
    return typeof str === 'string' || str instanceof String;
  };

  const parseDescription = (description: unknown): string => {
    if (!isString(description)) {
      throw new Error('Description is not a string');
    }
    return description;
  };

  const parseDate = (date: unknown): string => {
    if (!isString(date)) {
      throw new Error('Date is not a string');
    }
    return date;
  };

  const parseSpecialist = (specialist: unknown): string => {
    if (!isString(specialist)) {
      throw new Error('Specialist is not a string');
    }
    return specialist;
  };

  // PARSE DIAGNOSE CODES
  const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> => {
    if (
      !object ||
      typeof object !== 'object' ||
      !('diagnosisCodes' in object)
    ) {
      // we will just trust the data to be in correct form
      return [] as Array<Diagnose['code']>;
    }

    return object.diagnosisCodes as Array<Diagnose['code']>;
  };

  // Debo parsear con el type como condicional: HealthCheck, OccupationalHealthcare y Hospital

  return object;
};

export default toNewEntry;
