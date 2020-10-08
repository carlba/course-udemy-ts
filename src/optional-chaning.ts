// Optional Chaining
// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#optional-chaining
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
