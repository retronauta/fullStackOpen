import patients from '../../data/patients';
import { NonSsnField } from '../types';

const getPatients = (): NonSsnField[] => {
  return patients.map(({ dateOfBirth, gender, id, name, occupation }) => ({
    dateOfBirth,
    gender,
    id,
    name,
    occupation,
  }));
};

export default { getPatients };
