type addFn = (a: number, b: number) => number;

interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;
add = (n1: number, n2: number) => n1 + n2;

interface Named {
  readonly name?: string;
  outputName?: string;
}

interface Greetable extends Named {
  greet(phrase: string): void;
}

interface PersonInterface {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let user1: PersonInterface;

user1 = {
  name: 'Carl',
  age: 37,
  greet(phrase: string) {
    console.log(`${phrase}, ${this.name}`);
  }
};

user1.greet('Hello!');

class Person implements Greetable {
  constructor(readonly name?: string) {}
  greet(phrase: string) {
    if (this.name) {
      console.log(`${phrase}, ${this.name}`);
    } else {
      console.log('Hi!');
    }
  }
}

const person = new Person('Carl');
// Also ok since name is an optional property
const person1 = new Person();

person.greet('Hello!');

export {};
