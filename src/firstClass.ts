class Department {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  // This is not a real parameter that needs to be passed to the method
  // but it can be used to ensure that the describe method can only
  // be called from something that is similar to a Department class.
  describe(this: Department) {
    console.log('Department: ' + this.name);
  }
}

const accounting = new Department('accounting');
console.log(accounting);
accounting.describe();

const accountingCopy = { name: 'DUMMY', describe: accounting.describe };

accountingCopy.describe();
