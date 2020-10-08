type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

type ElevatedEmployee = Admin & Employee;

const el: ElevatedEmployee = {
  name: 'Carl ',
  privileges: ['create:server'],
  startDate: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric;

// Type Guard
// https://basarat.gitbook.io/typescript/type-system/typeguard
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(employee: UnknownEmployee) {
  console.log(`Name: ${employee.name}`);
  if ('privileges' in employee) {
    console.log(`Privileges: ${employee.privileges}`);
  }
}

printEmployeeInformation({ name: 'Carl', privileges: ['create:server'] });

class Car {
  drive() {
    console.log('Driving');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }
  loadCargo(amount: number) {
    console.log(`Loading cargo ... ${amount}`);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  let speed;
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
  }

  console.log(`Moving with speed: ${speed}`);
}

moveAnimal({ type: 'horse', runningSpeed: 20 });
