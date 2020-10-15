//const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;
// const userInputElement = document.getElementById('user-input')! as HTMLInputElement;

const userInputElement = document.getElementById('user-input')! as HTMLInputElement;

if (userInputElement) {
  (userInputElement as HTMLInputElement).value = 'Hi there!';
}

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
