import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';

const route = express.Router();

route.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

route.get('/:id', (req, res) => {
  const { id } = req.params;

  try {
    const patientFound = patientsService.getPatientById(id);
    if (patientFound) {
      res.status(200).json({ response: patientFound });
    } else {
      res.status(404).json({ response: null });
    }
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
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
