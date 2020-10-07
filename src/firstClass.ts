class Department {
  // private id: string;
  // private name: string;

  // Protected means that the property is available in this class and classes that
  // extend it.
  protected employees: string[] = [];

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

class ITDepartment extends Department {
  private admins: string[];
  constructor(id: string, admins: string[]) {
    super(id, 'it');
    this.admins = admins;
  }
}

class AccountingDepartment extends Department {
  constructor(id: string, private reports: string[]) {
    super(id, 'accounting');
  }

  addEmployee(name: string) {
    if (name === 'Carl') {
      return;
    }
    this.employees.push(name);
  }

  addReports(report: string) {
    this.reports.push(report);
  }
  printReports() {
    console.log(this.reports);
  }
}

const engineering = new Department('1', 'engineering');
engineering.describe();
engineering.addEmployee('Carl');
engineering.addEmployee('Johanna');

const it = new ITDepartment('2', ['Carl']);
// @ts-ignore
it.employees[3] = 'Tobias';
it.printEmployeeInformation();

const accounting = new AccountingDepartment('3', ['Carl', 'Johanna']);
accounting.addReports('Tobias');
accounting.printReports();
accounting.addEmployee('Carl');
accounting.addEmployee('Johanna');

// This will only show Johanna since Carl is not allowed the addEmployees method of the
// AccountingDepartment class.
accounting.printEmployeeInformation();
