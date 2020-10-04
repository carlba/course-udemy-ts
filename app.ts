const person = { name: 'Carl', age: 37, hobbies: ['sports', 'cooking'] };

let favoriteActivities: string[];
favoriteActivities = ['sports'];

// Typescript infers that hobbies is a list of strings and can therefore thrugh the
// IDE provide autocompletion for the invidual items when looping through the array.
for (const hobby of person.hobbies) {
  console.log(hobby.toUpperCase());
  //   console.log(hobby.map) // Map does not exist on a string
}

console.log(person.name);
