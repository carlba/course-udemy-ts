function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  if (typeof n1 !== 'number' || typeof n2 !== 'number') {
    throw new Error('Incorrect Type');
  }
  const result = n1 + n2;
  if (showResult) {
    console.log(phrase + result);
  } else {
    return n1 + n2;
  }
}

// Javascript will concatinate numbers and strings into strings.
// Javascript and Typescript only has the number type which covers all types of numbers.
const number1 = 5;
const number2 = 2.8;
const printResult = true;
const resultPhrase = 'Result is: ';

add(number1, number2, printResult, resultPhrase);
