function add(n1: number, n2: number) {
  return n1 + n2;
}

// If nothing is returned from the function Typescript will infer the return type void.
// Which essentially means nothing or the absense of anything.
function printResult(num: number): void {
  console.log('Result: ' + num);
}

printResult(add(5, 12));

// Function types can be described in an arrow function like syntax
// https://www.udemy.com/course/understanding-typescript/learn/lecture/16888102
let combineValues: (a: number, b: number) => number;
combineValues = add;
console.log(combineValues(8, 8));

// Function Types & Callbacks
// https://www.udemy.com/course/understanding-typescript/learn/lecture/16888106#overview
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
  const result = n1 + n2;
  cb(result);
}

addAndHandle(10, 20, result => {
  console.log(result);
});
