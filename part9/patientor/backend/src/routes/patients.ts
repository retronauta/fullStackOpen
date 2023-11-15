import express from 'express';
import patientsService from '../services/patientsService';

const route = express.Router();

route.get('/', (_req, res) => {
  res.send(patientsService.getPatients());
});

export default route;
