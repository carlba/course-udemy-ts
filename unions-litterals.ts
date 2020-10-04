//Union Types
//https://www.udemy.com/course/understanding-typescript/learn/lecture/16888082#notes
//Litteral Types
//https://www.udemy.com/course/understanding-typescript/learn/lecture/16888086#notes
function combine(
  input1: number | string,
  input2: number | string,
  resultType: 'string' | 'number'
) {
  let result: string | number;
  // When working with union types it may be needed to implement runtime timecheck
  // so that Typescript can now that we are not mixing the types.
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  if (resultType === 'number') {
    return +result;
  } else {
    return result.toString();
  }
}

const combinedAges = combine(30, 26, 'number');
console.log(combinedAges);

const combinedAges2 = combine('30', '26', 'number');
console.log(combinedAges2);

const combinedNames = combine('Max', 'Anna', 'string');
console.log(combinedNames);
