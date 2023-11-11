// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isNotNumber = (data: any): boolean => {
  return isNaN(Number(data));
};

const averageTime = (hours: number[]): number => {
  return Number(hours.reduce((a, b) => a + b) / hours.length);
};

const calcTrainingDays = (hours: number[]): number => {
  return hours.filter(day => day > 0).length;
};

const areWrongHeigtWeight = (height: number, weight: number): boolean => {
  if (height < 0 || weight < 0) return true;
  return false;
};

const parseArguments = (args: string[]) => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const slicedArgs = args.slice(2);

  slicedArgs.forEach(item => {
    if (isNotNumber(item)) {
      throw new Error('You can only use valid numbers');
    }
  });

  return slicedArgs.map(n => Number(n));
};

export {
  isNotNumber,
  averageTime,
  calcTrainingDays,
  areWrongHeigtWeight,
  parseArguments,
};
