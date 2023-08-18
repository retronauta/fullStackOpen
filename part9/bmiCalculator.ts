const calculateBmi = (height: number, weight: number) => {
  const bmi = Number((weight / ((height / 100) ^ 2)).toFixed(2))
  if (bmi < 18.5) {
    return 'Underweigth'
  } else if (bmi < 24.9) {
    return 'Healthy weigth'
  } else if (bmi < 29.9) {
    return 'Overweigth'
  } else {
    return 'Obese'
  }
}

console.log(calculateBmi(180, 74))
