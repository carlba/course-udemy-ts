// Unknown type
// https://www.udemy.com/course/understanding-typescript/learn/lecture/16888108
let userInput: unknown;
let username: string;
userInput = 5;
userInput = 'Carl';

// Does not work since Typescript does not now if userInput is of type string
// username = userInput;

// Works because Typescript detect the runtime typecheck and can be sure userInput is
// in this case a string.
if (typeof userInput === 'string') {
  username = userInput;
}

// Never
// https://www.udemy.com/course/understanding-typescript/learn/lecture/16888110

// The never type should be used when a function never returns something as in the
// case where it always throws an error.
function generateError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

generateError('An error occurred', 400);

export {};
