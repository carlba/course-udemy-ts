# Udemy Typescript

[Typescript: Handbook - Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)

## Core Types

![Core Types](https://cdn.jsdelivr.net/gh/carlba/assets@master/1DtY5G-EY3Xew.png)

### Type Inference

- This is invalid since Typescript inferred that the type of name is a string. Yet we
  try to assign a number too it.

  ```typescript
  let name = 'Carl';
  name = 2;
  ```

- We should not add types for basic types that Typescript can infer so don't do this

  ```typescript
  let name: string = 'Carl';
  name = 2;
  ```

- Neither for more complex object types like

  ```typescript
  const person: {
    name: string;
    age: number;
  } = { name: 'Carl', age: 37 };
  ```

### Typescript specific types

#### Tuple

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888072

An array with fixed lengths and types

```typescript
const person: { name: string; age: number; role: [number, string] } = {
  name: 'Carl',
  age: 27,
  role = [1, 'admin']
};

person.role[0] = 10;
person.role[1] = 'user';

person.role = [10, 'user'];

person.role = ['user', 10]; //Incorrect types
```

#### Litterals

```typescript
const person: { name: 'Carl' } = {};
```

### Returns

- If a function does not return anything Typescript will infer the return type to void
  https://www.udemy.com/course/understanding-typescript/learn/lecture/16888096

  ```typescript
  function printResult(num: number) {
    console.log('Result: ' + num);
  }
  ```

## Typescript compiler

[.tsconfig Docs](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
[.tsconfig.compilerOptions Docs](https://www.typescriptlang.org/docs/handbook/compiler-options.html)
[VS Code Debugging](https://code.visualstudio.com/docs/typescript/typescript-debugging)

### Watch mode for one file

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888158

```bash
  tsc app.ts --watch
```

### Watch mode for a whole project

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888162

To accomplish this Typescript needs to be aware that our folder is a project, like so:

```bash
tsc --init
```

This creates a tsconfig.json describing the project. It is now possible to run
`tsc --watch` to automatically detect and compile any changes in the project folder.

### Exclude files

```json
{
  "compilerOptions": {},
  "exclude": [
    "one-file.ts",
    "one*.ts",
    "**/*.file.ts", // Matches *.file.ts in any folder
    "functions-returns.ts",
    "unknown-never.ts"
  ]
}
```

Most common usage

```json
{
  "compilerOptions": {},
  "exclude": ["node_modules"]
}
```

### Include Files

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888166

Select exactly which files will be included in a Typescript project.

```json
{
  "compilerOptions": {},
  "include": ["app.ts", "analytics.ts"]
}
```

### Setting Compilation Target

https://www.udemy.com/course/understanding-typescript/learn/lecture/17009168#content

The javascript version Typescript compiles to default if not specific is `es3`.
Default in the generated `tsconfig.json` is `es5`. The target will affect how the
output js looks one example is that `let` and `const` will be used instead of `var` when
moving from `es5` to `es6` as target.

```json
{
  "compilerOptions": {
    "target": "es5"
  }
}
```

### Typescript included libraries

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888184

These control which libraries that are always available in the scope. By default
they include `document`, `element` and other things that is nativly available when
user Javascript in the browser

```json
{
  "compilerOptions": {
    "lib": ["lib"]
  }
}
```

### compilerOptions.outDir

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888192

Controls where Typescript puts the generated compiled Javascript files.

```json
{
  "compilerOptions": {
    "outDir": ["./dist"]
  }
}
```

### compilerOptions.noEmitOnError

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888192

Controls weather Typescript outputs Javascript files if a Typescript error occurs.

```json
{
  "compilerOptions": {
    "noEmitOnError": true
  }
}
```

### compilerOptions.strict

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888204

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888204

```json
{
  "compilerOptions": {
    "strict": true /* Enable all strict type-checking options. */
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "alwaysStrict": true,
  }
}
```

- noImplicitAny
  Prevents function declarations with undefined parameters

- strictNullChecks
  Makes Typescript very strict about when things might possible be null.

  ```typescript
  // There is no way for Typescript to know if this will return null.
  const button = document.getElementById('button');
  button.addEventListener('click', ()=> console.log('Button was clicked')
  ```

  If the toggle is active there are two ways of handling this.

  1. Use the exclamation mark

     ```typescript
     const button = document.getElementById('button')!;
     ```

     This will tell Typescript that we are sure that the statement will never return
     null.

  2. Use a runtime null check

     ```typescript
     const button = document.getElementById('button');
     if (button) {
       button.addEventListener('click', ()=> console.log('Button was clicked')
     }
     ```

- noUnusedLocals

  Prevents defining variables that are not used within the same scope.

- noUnusedParameters

  Prevents function parameters that are not used within the body.

- noImplicitReturn

  If set to true the below code would generate an error because we don't handle all
  possible input values within the function

  ```typescript
  function add(n1: number, n2: number) {
    if (n1 + n2 > 0) {
      return n1 + n2;
    }
  }
  ```

## Next-gen Javascript

### Rest Parameters

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888234

```typescript
// It is allowed to accept variable amount of parameters using Rest Parameters
const add = (...numbers: number[]) =>
  numbers.reduce((previousValue, currentValue) => previousValue + currentValue);

const addedNumbers = add(5, 7, 8, 6);
```

## OOP

[Max on OOP](https://cdn.jsdelivr.net/gh/carlba/assets@master/UYp0C6-WebHD_720p.mp4)

### Simple Class

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888246#notes

```typescript
class Department {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

const accounting = new Department('accounting');
console.log(accounting);
```

### Constructor Functions & The "this" Keyword

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888250

`this` can be a confusing subject in `Javascript` it usally refers
to the caller of the method or function.

In this example `this.name` refers to the name propert of the
object in the person constant.

```typescript
const person: {
  name: string;
  age: number;
  status: 'active' | 'inactive';
  describe: Function;
} = {
  name: 'Carl',
  age: 37,
  status: 'active',
  describe: function () {
    console.log(this.name);
  }
};

person.describe();
```

### "private" and "public" Access Modifiers

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888254#overview

### Shorthand syntax

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888258#overview

This is the "longhand" syntax

```typescript
class Department {
  constructor(public name: string) {}
}
```

And the shorthand syntax

```typescript
class Department {
  constructor(public name: string) {}
}
```

### Readonly

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888260

The property can only be set on initialization. Any attempt to write to it
after instantiation will fail.

```typescript
class Department {
  constructor(private readonly id, public name: string) {}
}
```

### Inheritance

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888264

### Overriding Properties & The "protected" Modifier

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888274#questions

If classes needs to be extended the protected keyword is helpful. It allows only classes
that extends the parent class to modify the property.

```typescript
class Department {
  protected employees: string[] = [];
  constructor(private readonly id: string, private name: string) {}
}
```

The `private` keyword instead only allows the parent class access to the property.

### Getters and Setters

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888278

### Static Methods

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888280

```typescript
  class Department() {
    static createEmployee(name: string) {
      return { name };
  }

  Department.createEmployee('carl');
```

Static methods can not be accessed using this. To use a static method within the
instance methods use `Department.createEmployee`.

### Abstract Classes

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888284

```typescript
  abstract class Department() {
    abstract describe(): void {}
  }

  class ITDepartment() extends Department {
    describe() {
      console.log(`IT Department`)
    }
  }

  Department.createEmployee('carl');
```

- Abstract classes cannot be instantiated.
- Classes that extends from Abstract classes must implement all abstract methods.

### Singleton

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888284

A singleton is a class that can only have one instance.

```typescript
class AccountingDepartment extends Department {
  private _lastReport: string;
  private static instance: AccountingDepartment;

  static getInstance() {
    return this.instance ? this.instance : new AccountingDepartment();
  }


const accounting = AccountingDepartment

```

## Interfaces

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888310

```typescript
interface Person {
  name: string;
  age: number;

  greet(phrase: string): void;
}

let user1: Person;

user1 = {
  name: 'Carl',
  age: 37,
  greet(phrase: string) {
    console.log(`${phrase}, ${this.name}`);
  }
};
```

An interface can be added as a type for any kind of object.

### Difference between Interfaces and Types

- Interfaces can only be used to define a structure of an object whilst types can
  contain unions types and similar.

- Interfaces can be implemented by classes.

- A class can implement multiple interfaces.

- Similar to Abstract Classes but with absolutely no implementation details.

- An interface can also be extended, like so:

  https://www.udemy.com/course/understanding-typescript/learn/lecture/16888320

  ```typescript
  interface Named {
    readonly name: string;
  }

  interface Greetable extends Named {
    greet(phrase: string): void;
  }
  ```

### Custom function type

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888326

```typescript
type addFn = (a: number, b: number) => number;
interface AddFn {
  (a: number, b: number): number;
}
```

### Optional Parameters & Properties

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888332

```typescript
interface Named {
  readonly name: string;
  outputName?: string;
}
```

## Advanced Types

https://www.typescriptlang.org/docs/handbook/advanced-types.html

### Intersection

https://www.udemy.com/course/understanding-typescript/learn/lecture/16893888

```typescript
type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;
```

### Type Guards

https://www.udemy.com/course/understanding-typescript/learn/lecture/16893892

https://basarat.gitbook.io/typescript/type-system/typeguard

A method to ensure a property or method exits on a object before
doing something.

### Discriminated Unions

https://www.udemy.com/course/understanding-typescript/learn/lecture/16893894

```typescript
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }

  console.log(`Moving with speed: ${speed}`);
}

moveAnimal({ type: 'horse', runningSpeed: 20 });
```

### Type Casting

https://www.udemy.com/course/understanding-typescript/learn/lecture/16893900#content

Three ways

#### User Brackets

```typescript
const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
```

#### Using as

```typescript
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;
```

#### Using Type Guard

```typescript
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = 'Hi there!';
}
```

### Index properties

https://www.udemy.com/course/understanding-typescript/learn/lecture/16893900

```typescript
// Index Properties
// Objects adhering to this interface MUST have an id property of type string
// Objects adhering to this interface CAN have attributes named any thing containing strings
interface ErrorContainer {
  id: string;
  [key: string]: string;
}

const errorBag: ErrorContainer = {
  id: 'error',
  email: 'Not a valid email',
  username: 'Must start with a capital character!'
};
```

### Function Overloading

https://www.udemy.com/course/understanding-typescript/learn/lecture/16893904

Function Overloading works by defining a return type for a certain set of function
input parameters, like so:

```typescript
// Function Overload
// https://basarat.gitbook.io/typescript/type-system/functions#overloading
// https://www.udemy.com/course/understanding-typescript/learn/lecture/16893904
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

const result = add('Carl', 'Bäckström');
```

### Optional Chaining and Nullish Coalescing

https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining

https://www.udemy.com/course/understanding-typescript/learn/lecture/16893908#overview

Use another value if first value is null or undefined

```typescript
const fetchedUserData = {
  id: 'u1',
  name: 'Carl',
  job: { title: 'CEO', description: 'My own company' }
};

console.log(fetchedUserData?.job?.title);

// Nullish Coalescing
// Use another value if first value is null or undefined
const userInput = null;
const storedData = userInput ?? 'DEFAULT';

console.log(storedData);
```

## Generics

https://www.udemy.com/course/understanding-typescript/learn/lecture/16894042
https://www.typescriptlang.org/docs/handbook/generics.html

A generic type is a type connected to another type.

### Creating Generic Function

https://www.udemy.com/course/understanding-typescript/learn/lecture/16894048

The unknown "generic" types are defined by angle brackets and can then be used
as a parameter type and return type. When the two generic parameter are specified
Typescript can infer that the merge function will return a union of T and U. It could
also be specified as the return type T & U.

It is possible to define the generic parameter when a function is called using
`merge<string, number>`.

```typescript
function merge<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

console.log(merge({ name: 'Carl ' }, { age: 22 }));
```

### Type Constraints

https://www.udemy.com/course/understanding-typescript/learn/lecture/16894050

It is possible to constrain a generic type using the extends syntax, like so:

```typescript
function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

console.log(merge({ name: 'Carl ' }, 30));
```

Doing so will cause Typescript to complain that 30 is not an object.

### keyof

https://www.udemy.com/course/understanding-typescript/learn/lecture/16894062

The `keyof` keyword means all keys of a certain generic type. This example shows
how to use it with two generic types.

```typescript
function extractAndConvert<T, U extends keyof T>(obj: T, key: U) {
  return `Value: ${obj[key]}`;
}

console.log(extractAndConvert({ name: 'test' }, 'name'));
```

### Generic Classes

https://www.udemy.com/course/understanding-typescript/learn/lecture/16894068#overview

### Generic Utility Types

https://www.udemy.com/course/understanding-typescript/learn/lecture/16894076
https://www.typescriptlang.org/docs/handbook/utility-types.html

## Decorators

https://www.typescriptlang.org/docs/handbook/decorator

### First Class Decorator

https://www.udemy.com/course/understanding-typescript/learn/lecture/16935714#overview

- `experimentalDecorators": true` must be set to true in `tsconfig.json`
- A Class Decorator takes one argument the constructor of the class
- A Class Decorator is applied when the class is defined not when an object
  is instantiated.

```typescript
function Logger(constructor: Function) {
  console.log('Logging...');
  console.log(constructor);
}

@Logger
class Person {
  name = 'Carl';

  constructor() {
    console.log('Creating person object...');
  }
}

const person = new Person();
console.log(person);
```

### Working with Decorator Factories

https://www.udemy.com/course/understanding-typescript/learn/lecture/16935716#overview

To be able to modify the behavior of a decorator a decorator factory can be used. This will allow
us to pass in an argument to the decorator, like so:

```typescript
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

@Logger('LOGGING - PERSON')
class Person {
  name = 'Carl';

  constructor() {
    console.log('Creating person object...');
  }
}

const person = new Person();
console.log(person);
```

### Building Angular myself using decorators

https://www.udemy.com/course/understanding-typescript/learn/lecture/16935718
https://www.udemy.com/course/understanding-typescript/learn/lecture/16935720

- Decorators execute from bottom to top. Not factories though

### Diving into Property Decorators

https://www.udemy.com/course/understanding-typescript/learn/lecture/16935722

### Accessor & Parameter Decorators

https://www.udemy.com/course/understanding-typescript/learn/lecture/16935724

### Replacing the constructor of a class

https://www.udemy.com/course/understanding-typescript/learn/lecture/16935734

```typescript
function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY');
  return function <T extends { new (...args: any[]): { name: string } }>(originalConstructor: T) {
    console.log('Rendering Template');
    return class extends originalConstructor {
      constructor(...args: any[]) {
        super();
        const hookElement = document.getElementById(hookId);
        if (hookElement) {
          hookElement.innerHTML = template + `<h2>${this.name}</h2`;
        }
      }
    };
  };
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Carl';

  constructor() {
    console.log('Creating person object...');
  }
}

const person = new Person();
console.log(person);

function Log(target: any, propertyName: string) {
  console.log(target, propertyName);
}
```

### Example: Creating an "Autobind" Decorator

https://www.udemy.com/course/understanding-typescript/learn/lecture/16935736#overview

## Drag & Drop Project

https://www.udemy.com/course/understanding-typescript/learn/lecture/16935762

## Managing Application State with Singletons

https://www.udemy.com/course/understanding-typescript/learn/lecture/16935820

## More Classes & Custom Types

https://www.udemy.com/course/understanding-typescript/learn/lecture/16935832

## Filtering Projects with Enums

https://www.udemy.com/course/understanding-typescript/learn/lecture/16935840

## Adding Inheritance & Generics

https://www.udemy.com/course/understanding-typescript/learn/lecture/16935850

This lesson is a good example on how to refactor classes using abstract classes.

- public methods should go before private

## Rendering Project Items with a Class

https://www.udemy.com/course/understanding-typescript/learn/lecture/16935852#overview

- getter methods should be positioned between fields and constructor

# Drag & Drop

[Mozilla Drag & Drop](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API)

## Utilizing Interfaces to Implement Drag & Drop

https://www.udemy.com/course/understanding-typescript/learn/lecture/16935858

## Drag Events & Reflecting the Current State in the UI

https://www.udemy.com/course/understanding-typescript/learn/lecture/16935876

## Adding a Droppable Area

- To enable dropping it is important to remember to do `event.preventDefault` in the
  function handling the `dragover` event. This allows a drop to happen on the element
  which has the `dragover` event handler attached to it.
