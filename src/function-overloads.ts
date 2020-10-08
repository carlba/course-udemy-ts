type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

// Function Overload
// https://basarat.gitbook.io/typescript/type-system/functions#overloading
// https://www.udemy.com/course/understanding-typescript/learn/lecture/16893904#content
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add('Carl', 'Bäckström');
