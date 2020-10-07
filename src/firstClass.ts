class Department {
  // private id: string;
  // private name: string;
  private employees: string[] = [];

  // This is the shorthand syntax for constructors. Parameters needs to be
  // declared with private or public before them. No further declaration of the
  // the properties is needed.
  constructor(private readonly id: string, private name: string) {
    // this.id = id;
    // this.name = name;
  }

  // This is not a real parameter that needs to be passed to the method
  // but it can be used to ensure that the describe method can only
  // be called from something that is similar to a Department class.
  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department('1', 'accounting');
accounting.describe();

accounting.addEmployee('Carl');
accounting.addEmployee('Johanna');

// Not allowed since `accounting.employees` is a private property
// @ts-ignore
accounting.employees[3] = 'Tobias';
accounting.printEmployeeInformation();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };
// accountingCopy.describe();
