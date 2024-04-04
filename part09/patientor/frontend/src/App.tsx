import { useState, useEffect } from 'react';
import axios from 'axios';
import { Route, Link, Routes, useMatch } from 'react-router-dom';
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from './constants';
import { Diagnose, Patient } from './types';

import patientService from './services/patients';
import diagnoseService from './services/diagnoses';
import PatientListPage from './components/PatientListPage';
import PatientData from './components/PatientData';

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);
  const match = useMatch('/patients/:id');

  const patient = match
    ? patients.find(patient => patient.id === match.params.id)
    : null;

  useEffect(() => {
    // Comprobando conexion haciendo GET a /ping
    void axios.get<void>(`${apiBaseUrl}/ping`);

    // GET de los pacientes para setearlos.
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };

    //GET Diagnoses
    const fetchDiagnosesList = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnosesList();
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: '0.5em' }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
          <Route
            path="/patients/:id"
            element={<PatientData patient={patient} diagnoses={diagnoses} />}
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
