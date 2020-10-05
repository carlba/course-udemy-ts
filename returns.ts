function add(n1: number, n2: number) {
  return n1 + n2;
}

// If nothing is returned from the function Typescript will infer the return type void.
// Which essentially means nothing or the absense of anything.
function printResult(num: number): void {
  console.log('Result: ' + num);
}

printResult(add(5, 12));
