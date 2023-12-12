import patients from '../../data/patients';
import { NewPatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';
const getPatients = (): Patient[] => {
  return patients.map(
    ({ dateOfBirth, gender, id, name, occupation, entries, ssn }) => ({
      dateOfBirth,
      gender,
      id,
      name,
      occupation,
      entries,
      ssn,
    })
  );
};

const getPatientById = (id: string) => {
  const patient = patients.find(patient => id === patient.id);
  return patient;
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...patient,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getPatients, addPatient, getPatientById };
