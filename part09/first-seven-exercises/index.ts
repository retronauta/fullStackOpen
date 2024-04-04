import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
// import { areAllNumbers } from './utils/utils';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack');
});

app.get('/bmi', (req, res) => {
  const { height, weight } = req.query;

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyExercises, target } = req.body;

  try {
    if (!dailyExercises || !target) throw new Error('Parameters missing');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (dailyExercises.length === 0)
      throw new Error('Insufficient days of exercise, add at least one.');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    if (dailyExercises.some(isNaN)) throw new Error('malformatted parameters');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    if (isNaN(target)) throw new Error('Target must be a number');

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(dailyExercises, Number(target));
    return res.send({ result });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).send({ error: error.message });
    } else {
      return res.end();
    }
  }
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
