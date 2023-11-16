import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';

// import { v1 as uuid } from 'uuid';

const route = express.Router();

route.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

route.post('/', (req, res) => {
  // primero debo comprobar y parsear datos
  // una vez comprobados recien uso el servicio para aniadirlos
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedPatient = patientsService.addPatient(newPatientEntry);
    res.json(addedPatient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default route;
