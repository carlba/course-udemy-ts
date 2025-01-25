// Drag & Drop Interfaces
// https://www.udemy.com/course/understanding-typescript/learn/lecture/16935858

interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  dragOverHandler(event: DragEvent): void;
  dropHandler(event: DragEvent): void;
  dragLeaveHandler(event: DragEvent): void;
}

enum ProjectStatus {
  Active,
  Finished
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type Listener<T> = (items: T[]) => void;

abstract class State<T> {
  protected listeners: Listener<T>[] = [];

  addListener(listenerFn: Listener<T>) {
    this.listeners.push(listenerFn);
  }
}

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
class ProjectState extends State<Project> {
  private projects: Project[] = [];
  private static instance: ProjectState;

  private constructor() {
    super();
  }

  static getInstance() {
    this.instance = this.instance ? this.instance : new ProjectState();
    return this.instance;
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
 * Defining the class as abstract disallows instantiation which means that the class
 * can only be used for inheritance.
 *
 * Adding Inheritance & Generics
 * https://www.udemy.com/course/understanding-typescript/learn/lecture/16935850
 *
 *
 */
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;
  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(templateId)! as HTMLTemplateElement;
    this.hostElement = document.getElementById(hostElementId)! as T;
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as U;
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertAtStart);
  }
  private attach(insertAtStart: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtStart ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
  abstract configure(): void;
  abstract renderContent(): void;
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
  private project: Project;

  get personsLabel() {
    return this.project.people === 1 ? 'one person' : `${this.project.people} persons`;
  }

  constructor(hostId: string, project: Project) {
    super('single-project', hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }

  /**
   * The `AutoBind` decorator is used to ensure that `this` of the class is available in
   * the callback function.
   *
   *
   * `event.dataTransfer` can be undefined since `DragEvent`
   * symbolizes all Drag events from different event handlers. For the `dragstart` event
   * it is always available.
   *
   * @param event The Dragstart event
   */
  @AutoBind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData('text/plain', this.project.id);
    event.dataTransfer!.effectAllowed = 'move';
  }

  @AutoBind
  dragEndHandler(event: DragEvent) {
    console.log('dragEnd', event);
  }

  configure(): void {
    this.element.addEventListener('dragstart', this.dragStartHandler);
    this.element.addEventListener('dragend', this.dragEndHandler);
  }

  renderContent(): void {
    this.element.querySelector('h2')!.textContent = this.project.title;
    this.element.querySelector('h3')!.textContent = this.personsLabel + ' assigned';
    this.element.querySelector('p')!.textContent = this.project.description;
  }
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
class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
  assignedProjects: Project[] = [];
  constructor(private type: 'active' | 'finished') {
    super('project-list', 'app', false, `${type}-projects`);
    this.configure();
    this.renderContent();
  }

  @AutoBind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
      event.preventDefault();
      const listEl = this.element.querySelector('ul')!;
      listEl.classList.add('droppable');
    }
  }

  dropHandler(event: DragEvent) {
    console.log('dropHandler', event.dataTransfer!.getData('text/plain'));
  }

  @AutoBind
  dragLeaveHandler(event: DragEvent) {
    const listEl = this.element.querySelector('ul')!;
    listEl.classList.remove('droppable');
  }

  configure(): void {
    this.element.addEventListener('dragover', this.dragOverHandler);
    this.element.addEventListener('dragleave', this.dragLeaveHandler);
    this.element.addEventListener('drop', this.dropHandler);

    projectState.addListener((projects: Project[]) => {
      const relevantProjects = projects.filter(project => {
        return this.type === 'active'
          ? project.status === ProjectStatus.Active
          : project.status === ProjectStatus.Finished;
      });
      this.assignedProjects = relevantProjects;
      this.renderProjects();
    });
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector('ul')!.id = listId;
    this.element.querySelector('h2')!.textContent =
      this.type.toUpperCase() + ' projects'.toUpperCase();
  }

  private renderProjects() {
    const listEl = document.getElementById(`${this.type}-projects-list`)!;
    listEl.innerHTML = '';
    for (const project of this.assignedProjects) {
      new ProjectItem(listEl.id, project);
    }
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
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input');
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    this.titleInputElement = this.element.querySelector('#title')! as HTMLInputElement;
    this.descriptionInputElement = this.element.querySelector('#description')! as HTMLInputElement;
    this.peopleInputElement = this.element.querySelector('#people')! as HTMLInputElement;
    this.configure();
  }

  configure(): void {
    this.element.addEventListener('submit', this.submitHandler);
  }

  renderContent(): void {}

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
}

const projectInput = new ProjectInput();
const activeProjectList = new ProjectList('active');
const finishedProjectList = new ProjectList('finished');
