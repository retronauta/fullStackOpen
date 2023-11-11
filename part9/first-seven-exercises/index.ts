import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();
express.json();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (_req, res) => {
  const { height, weight } = _req.query;

  try {
    const bmi = calculateBmi(Number(height), Number(weight));
    res.json({
      weight,
      height,
      bmi,
    });
  } catch (error) {
    res.json({
      error: 'malformatted parameters',
    });
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});