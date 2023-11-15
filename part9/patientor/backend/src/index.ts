import express from 'express';
import diagnosesRouter from './routes/diagnoses';
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

app.listen(PORT, () => {
  console.log(`server running un port: ${PORT}`);
});
