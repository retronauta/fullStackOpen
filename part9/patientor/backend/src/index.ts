import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients';
import cors from 'cors';
const app = express();

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get('/api/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);
app.listen(PORT, () => {
  console.log(`server running un port: ${PORT}`);
});
