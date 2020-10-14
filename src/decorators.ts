({
  plugins: ['jsdom-quokka-plugin'],
  jsdom: { file: '../decorators.html' }
});

// function Logger(constructor: Function) {
//   console.log('Logging...');
//   console.log(constructor);
// }

function Logger(logString: string) {
  console.log('LOGGER FACTORY');
  return function (constructor: Function) {
    console.log(logString);
    console.log(constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('TEMPLATE FACTORY');
  return function <T extends { new (...args: any[]): { name: string } }>(originalConstructor: T) {
    console.log('Rendering Template');
    return class extends originalConstructor {
      constructor(...args: any[]) {
        super();
        const hookElement = document.getElementById(hookId);
        if (hookElement) {
          hookElement.innerHTML = template + `<h2>${this.name}</h2`;
        }
      }
    };
  };
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Carl';

  constructor() {
    console.log('Creating person object...');
  }
}

const person = new Person();
console.log(person);

function Log(target: any, propertyName: string) {
  console.log(target, propertyName);
}

/**
 *
 * @param target Prototype of the instance or the constructor
 * @param name Name of the setter
 * @param descriptor
 */
function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('Accessor Decorator', { target, name, descriptor });
}

/**
 *
 * @param target Prototype of object if static else constructor
 * @param name Name of the method
 * @param descriptor PropertyDescriptor
 */
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method Decorator', { target, name, descriptor });
}
/**
 *
 * @param target  Prototype of object if static else constructor
 * @param name Name of method where the parameter is used
 * @param descriptor
 */
function Log4(target: any, name: string, position: number) {
  console.log('Parameter Decorator', { target, name, position });
}

class Product {
  private _price: number;

  // Executes when property is defined when class definition is created by Javascript
  @Log
  title: string;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Price must be above 0');
    }
  }

  get price() {
    return this._price;
  }

  constructor(title: string, price: number) {
    this.title = title;
    this._price = price;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this.price * (1 + tax);
  }
}

const book = new Product('Book', 20);
console.log(book);

const test = new Product('case', 20);
