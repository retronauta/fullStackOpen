interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const averageTime = (hours: number[]): number => {
  return Number(hours.reduce((a, b) => a + b) / hours.length);
};

const calcTrainingDays = (hours: number[]): number => {
  return hours.filter(day => day > 0).length;
};

const fixedAverage = (average: number): number => {
  return Number(average.toFixed(0));
};

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
