interface Greetable {
  name: string;
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
  constructor(public name) {}
  greet(phrase) {
    console.log(`${phrase}, ${this.name}`);
  }
}

const person = new Person('Carl');

person.greet('Hello!');
