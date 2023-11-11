import {
  areWrongHeigtWeight,
  isNotNumber,
  // parseArguments,
} from './utils/utils';

export const calculateBmi = (height: number, weight: number): string => {
  let bmi: number = (weight / height / height) * 10000;

  //* Error cases
  if (areWrongHeigtWeight(height, weight))
    throw new Error('Invalid arguments, please insert a number above zero');

  if (isNotNumber(bmi))
    throw new Error('Invalid arguments, please only insert valid numbers');

  if (bmi < 18.5) {
    return 'Underweight';
  } else if (bmi < 25) {
    return 'Normal';
  } else if (bmi < 30) {
    return 'Overweight';
  } else {
    return 'Obesity';
  }
};

// try {
//   const [value1, value2] = parseArguments(process.argv);
//   console.log(calculateBmi(value1, value2));
// } catch (error: unknown) {
//   let errorMessage = 'Something bad happened';
//   if (error instanceof Error) {
//     errorMessage += ' Error: ' + error.message;
//   }
//   console.error(errorMessage);
// }
