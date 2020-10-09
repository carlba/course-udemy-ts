const names: Array<string> = ['Carl', 'Johanna'];
const names2: string[] = ['Carl', 'Johanna'];

names[0].split(' ');

// Using promises with generic types
const promise: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() => resolve('This is done!!'), 50);
});

promise.then(result => console.log(result));

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

console.log(merge({ name: 'Carl ' }, { age: 22 }));

// Not allowed with the type constraint
//console.log(merge({ name: 'Carl ' }, 30));

interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.';
  if (element.length === 1) {
    descriptionText = `Got 1 element `;
  } else if (element.length > 1) {
    descriptionText = `Got ${element.length} elements.`;
  }
  return [element, descriptionText];
}

console.log(countAndDescribe(['sports', 'cooking']));

function extractAndConvert<T, U extends keyof T>(obj: T, key: U) {
  return `Value: ${obj[key]}`;
}

console.log(extractAndConvert({ name: 'test' }, 'name'));

class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }
  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }
  getItems() {
    return [...this.data];
  }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Carl');
textStorage.addItem('Johanna');
// Not allowed because the generic type of the textStorage is string
// textStorage.addItem(1);
textStorage.removeItem('Johanna');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);

const combinedStorage = new DataStorage<number | string>();
combinedStorage.addItem('Carl');
combinedStorage.addItem(22);
console.log(combinedStorage.getItems());

// We constrained the DataStorage class to only allow primitive types because the below
// does not work

// const objStorage = new DataStorage<object>();
// objStorage.addItem({ name: 'Carl' });
// objStorage.addItem({ name: 'Johanna' });

// console.log(objStorage.getItems());

export {};
