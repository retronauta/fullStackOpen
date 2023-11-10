import { averageTime, calcTrainingDays, parseArguments } from './utils/utils';

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (
  dailyHours: number[],
  targetHours: number
): Result => {
  const average: number = averageTime(dailyHours);
  const periodLength: number = dailyHours.length;
  const trainingDays: number = calcTrainingDays(dailyHours);
  let success: boolean;
  let ratingDescription: string;
  let rating: number;

  if (average < targetHours) {
    success = false;
    ratingDescription = 'Fail';
    rating = 1;
  } else if (average === targetHours) {
    success = true;
    ratingDescription = 'Good';
    rating = 2;
  } else {
    success = true;
    ratingDescription = 'Awesome';
    rating = 3;
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: targetHours,
    average,
  };
};

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
try {
  const hours = parseArguments(process.argv);
  console.log(calculateExercises(hours, 2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.error(errorMessage);
}
