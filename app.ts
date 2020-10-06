const button = document.querySelector('button')!;

function clickHandler(message: string) {
  console.log('Clicked! ' + message);
}

// If you want to pass arguments to an callback function use bind.
if (button) {
  button.addEventListener('click', clickHandler.bind(null, "You're welcome!"));
}
