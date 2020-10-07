class Department {
  name: string;
  private employees: string[] = [];
  constructor(name: string) {
    this.name = name;
  }

  // This is not a real parameter that needs to be passed to the method
  // but it can be used to ensure that the describe method can only
  // be called from something that is similar to a Department class.
  describe(this: Department) {
    console.log('Department: ' + this.name);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }
  printEmployeeInformation() {
    console.log(this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department('accounting');
accounting.describe();

accounting.addEmployee('Carl');
accounting.addEmployee('Johanna');

// Not allowed since `accounting.employees` is a private property
// @ts-ignore
accounting.employees[3] = 'Tobias';
accounting.printEmployeeInformation();

// const accountingCopy = { name: 'DUMMY', describe: accounting.describe };
// accountingCopy.describe();
