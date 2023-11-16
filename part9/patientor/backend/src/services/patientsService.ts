import patients from '../../data/patients';
import { NewPatient, NonSsnField, Patient } from '../types';
import { v1 as uuid } from 'uuid';
const getPatients = (): NonSsnField[] => {
  return patients.map(({ dateOfBirth, gender, id, name, occupation }) => ({
    dateOfBirth,
    gender,
    id,
    name,
    occupation,
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatients, addPatient };
