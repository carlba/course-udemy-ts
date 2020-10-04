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

person.role.push('admin');

person.role[0] = 10;
person.role = [0, 'admin'];

let favoriteActivities: string[];
favoriteActivities = ['sports'];

// Typescript infers that hobbies is a list of strings and can therefore thrugh the
// IDE provide autocompletion for the invidual items when looping through the array.
for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  //   console.log(hobby.map) // Map does not exist on a string
}

console.log(person.name);
