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

  @AutoBind
  private submitHandler(event: Event): void {
    event.preventDefault();
    console.log(this.titleInputElement.value);
  }

  private configure(): void {
    this.element.addEventListener('submit', this.submitHandler);
  }
}

const projectInput = new ProjectInput();
