//Union Types
//https://www.udemy.com/course/understanding-typescript/learn/lecture/16888082#notes
function combine(input1: number | string, input2: number | string) {
  let result: string | number;
  // When working with union types it may be needed to implement runtime timecheck
  // so that Typescript can now that we are not mixing the types.
  if (typeof input1 === 'number' && typeof input2 === 'number') {
    result = input1 + input2;
  } else {
    result = input1.toString() + input2.toString();
  }
  return result;
}

const combinedAges = combine(30, 26);
console.log(combinedAges);

const combinedNames = combine('Max', 'Anna');
console.log(combinedNames);
