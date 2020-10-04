# Udemy Typescript

## Core Types

![Core Types](https://cdn.jsdelivr.net/gh/carlba/assets@master/1DtY5G-EY3Xew.png)

## Type Inferance

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

## Typescript specific types

### Touple

https://www.udemy.com/course/understanding-typescript/learn/lecture/16888072#notes

An array with fixed lenghts and types

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
