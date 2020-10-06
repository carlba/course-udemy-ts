# Udemy Typescript

[Typescript: Handbook - Basic Types](https://www.typescriptlang.org/docs/handbook/basic-types.html)

## Core Types

![Core Types](https://cdn.jsdelivr.net/gh/carlba/assets@master/1DtY5G-EY3Xew.png)

### Type Inferance

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

#### Touple

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
  "include": ["app.ts", "an
  alytics.ts"]
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

These control which libraries that are always availible in the scope. By default
they include `document`, `element` and other things that is nativly availible when
user Javascript in the browser

```json
{
  "compilerOptions": {
    "lib": ["lib"]
  }
}
```
