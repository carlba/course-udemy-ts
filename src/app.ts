// allowed even if noUnusedLocals is set because Typescript can't know if it is used
// in another script file.
let appId = 'abc';
const button = document.querySelector('button')!;

// If "noImplicitReturns": true this will return an error because the function does not
// always return a value.
function add(n1: number, n2: number) {
  if (n1 + n2 > 0) {
    return n1 + n2;
  }
}

function clickHandler(message: string) {
  console.log('Clicked! ' + message);
}

// If you want to pass arguments to an callback function use bind.
if (button) {
  button.addEventListener('click', clickHandler.bind(null, "You're welcome!"));
}
