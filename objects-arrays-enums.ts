const person: {
  name: string;
  age: number;
  hobbies: string[];
  role: [number, string];
} = {
  name: 'Carl',
  age: 37,
  hobbies: ['sports', 'cooking'],
  role: [2, 'author']
};

// Typescript infers that hobbies is a list of strings and can therefore thrugh the
// IDE provide autocompletion for the invidual items when looping through the array.
for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  //   console.log(hobby.map) // Map does not exist on a string
}

console.log(person.name);

// Touples
person.role.push('admin');

person.role[0] = 10;
person.role = [0, 'admin'];

let favoriteActivities: string[];
favoriteActivities = ['sports'];

// Enum
// https://www.udemy.com/course/understanding-typescript/learn/lecture/16888074#notes
// The values of the enum keys will be an integer based on it's position.
enum Role {
  ADMIN,
  READ_ONLY,
  AUTHOR
}

// You can define custom values like so
enum StringRole {
  ADMIN = 'admin',
  READ_ONLY = 'readonly',
  AUTHOR = 'author'
}

const personEnum = {
  name: 'Carl',
  age: 37,
  hobbies: ['sports', 'cooking'],
  role: Role.ADMIN
};

if (personEnum.role === Role.ADMIN) {
  console.log('isAdmin');
}
