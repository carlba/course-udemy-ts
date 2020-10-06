// It is allowed to accept variable amount of parameters using Rest Parameters
const add = (...numbers: number[]) =>
  numbers.reduce((previousValue, currentValue) => previousValue + currentValue);

const addedNumbers = add(5, 7, 8, 6);
