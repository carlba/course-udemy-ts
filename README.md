# Udemy Typescript

## Core Types

![Core Types](https://cdn.jsdelivr.net/gh/carlba/assets@master/7AjUWA-9lbHqr.png)

![Core Types](https://cdn.jsdelivr.net/gh/carlba/assets@master/TyWTCc-tlQCUj.png)

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
