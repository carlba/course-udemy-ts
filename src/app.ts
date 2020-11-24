enum ProjectStatus {
  Active,
  Finished
}

class Project {
  constructor(
    public id: string,
    public title: string,
    description: string,
    people: number,
    public status: ProjectStatus
  ) {}
}

type Listener = (items: Project[]) => void;

/**
 * ## Managing Application State with Singletons
 *
 * https://www.udemy.com/course/understanding-typescript/learn/lecture/16935820
 *
 * This is a singleton class that maintains the state of the application. We ensure
 * that it is a singleton by declaring the constructor private so that the `new` keyword
 * cannot be used to create an instance. Instead a `getInstance()` method is created that
 * either returns the existing instance or creates a new one. This effectively ensures
 * that only one instance of the class can exists at any given time.
 *
 * This also implements a subscription pattern similar to the one Angular uses.
 * The `addListener()` method allows subscribers to register listener functions that
 * will receive an updated project list when a new project is added.
 */
class ProjectState {
  private listeners: Listener[] = [];
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    this.instance = this.instance ? this.instance : new ProjectState();
    return this.instance;
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, numberOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numberOfPeople,
      ProjectStatus.Active
    );
    this.projects.push(newProject);
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validatableInput: Validatable) {
  let isValid = true;
  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }
  if (validatableInput.minLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
  }
  if (validatableInput.maxLength != null && typeof validatableInput.value === 'string') {
    isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
  }
  if (validatableInput.min != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value >= validatableInput.min;
  }
  if (validatableInput.max != null && typeof validatableInput.value === 'number') {
    isValid = isValid && validatableInput.value <= validatableInput.max;
  }
  return isValid;
}

/**
 * This will ensure that a method always has access to this by adding a getter that
 * binds this to the inner method. To avoid having to do that manually.
 * Creating an "Autobind" Decorator
 * https://www.udemy.com/course/understanding-typescript/learn/lecture/16935736
 * @param _ target
 * @param __ name
 * @param descriptor
 */
function AutoBind(_: any, __: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFunction = originalMethod.bind(this);
      return boundFunction;
    }
  };
  return adjustedDescriptor;
}

/**
 * This is the class that renders the project list into the DOM. It shares a lot of code
 * with the ProjectInput. One thing that differs is that we add the contents `beforeend`,
 * like so: `this.hostElement.insertAdjacentElement('beforeend', this.element);`. This
 * inserts the template element before the end tag of the hostElement I.E the div with
 * id `app`. The internal list of projects is filtered when new projects is received from
 * the listener. We are using `listEl.innerHTML = '';` To prevent the projects from
 * being rendered twice we are clearing all previous data from the list.
 *
 * ## Rendering Project Lists
 * https://www.udemy.com/course/understanding-typescript/learn/lecture/16935812
 *
 * ## Filtering Projects with Enums
 * https://www.udemy.com/course/understanding-typescript/learn/lecture/16935840
 *
 */
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: Project[] = [];
  constructor(private type: 'active' | 'finished') {
    this.templateElement = document.getElementById('project-list')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = `${this.type}-projects`;
    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(project => {
        return this.type === 'active'
          ? project.status === ProjectStatus.Active
          : project.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`)!;
    listEl.innerHTML = '';
    for (const project of this.assignedProjects) {
      const listItem = document.createElement('li');
      listItem.textContent = project.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' projects'.toUpperCase();
  }

  private attach() {
    this.hostElement.insertAdjacentElement('beforeend', this.element);
  }
}

/**
 * This class gets the template in the HTML and the target div and inserts the element
 * in the targeted div. Typecasting is used to work around the issue that we don't
 * know weather the elements retrieved using `document.getElementById()` is undefined or
 * which type of element we are getting back.
 *
 * https://www.udemy.com/course/understanding-typescript/learn/lecture/16935768
 *
 * ## Interacting with DOM Elements
 * The class is used to register clickHandler. We use the  `AutoBind` decorator to avoid
 * having to do `this.submitHandler.bind(this)`. Which is the normal workaround to allow
 * a callback function to use `this` of the instance.
 *
 *
 * https://www.udemy.com/course/understanding-typescript/learn/lecture/16935770
 *
 * ## Creating a Re-Usable Validation Functionality
 *
 * https://www.udemy.com/course/understanding-typescript/learn/lecture/16935796
 *
 */
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;

    this.configure();
    this.attach();
  }
  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }

  /**
   * The `void` return type allows one of the branches of the function to not return a value.
   *
   *
   * [Fetching User Input](https://www.udemy.com/course/understanding-typescript/learn/lecture/16935782)
   *
   * @returns A tuple with three elements `string`, `string` and number. Declared in
   *          ts using the `[string, string, number]` syntax.
   */
  private gatherUserInput(): [string, string, number] | void {
    const enteredTitle = this.titleInputElement.value;
    const enteredDescription = this.descriptionInputElement.value;
    const enteredPeople = this.peopleInputElement.value;

    const titleValidatable: Validatable = {
      value: enteredTitle,
      required: true
    };

    const descriptionValidatable: Validatable = {
      value: enteredDescription,
      required: true,
      minLength: 5
    };

    const peopleValidatable: Validatable = {
      value: enteredPeople,
      required: true,
      max: 2
    };

    if (
      !validate(titleValidatable) ||
      !validate(descriptionValidatable) ||
      !validate(peopleValidatable)
    ) {
      alert('Invalid input, please try again!');
    } else {
      return [enteredTitle, enteredDescription, +enteredPeople];
    }
  }

  private clearInputs() {
    this.titleInputElement.value = '';
    this.descriptionInputElement.value = '';
    this.peopleInputElement.value = '';
  }

  @AutoBind
  private submitHandler(event: Event): void {
    event.preventDefault();
    const userInput = this.gatherUserInput();
    if (Array.isArray(userInput)) {
      const [title, description, people] = userInput;
      projectState.addProject(title, description, people);

      console.log(title, description, people);
      this.clearInputs();
    }
  }

  private configure(): void {
    this.element.addEventListener('submit', this.submitHandler);
  }
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
