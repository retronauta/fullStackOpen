const calculateBmi = (height: number, weight: number): string => {
  let bmi: number = (weight / height / height) * 10000;

  //* Error cases
  if (height < 0 || weight < 0)
    throw new Error('Invalid arguments, please insert a number above zero');

  if (isNaN(bmi))
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

console.log(calculateBmi(175, 90));
