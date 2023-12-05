import patients from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../types';
import { v1 as uuid } from 'uuid';
const getPatients = (): NonSensitivePatient[] => {
  return patients.map(
    ({ dateOfBirth, gender, id, name, occupation, entries }) => ({
      dateOfBirth,
      gender,
      id,
      name,
      occupation,
      entries,
    })
  );
};

const getPatientById = (id: string) => {
  console.log(id);
  const patient = patients.find(patient => id === patient.id);
  console.log(patient);
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
