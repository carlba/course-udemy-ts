/**
 * This class gets the template in the HTML and the target div and inserts the element
 * in the targeted div. Typecasting is used to work around the issue that we don't
 * know weather the elements retrieved using `document.getElementById()` is undefined or
 * which type of element we are getting back.
 * https://www.udemy.com/course/understanding-typescript/learn/lecture/16935768
 */
class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;

  constructor() {
    this.templateElement = document.getElementById('project-input')! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;
    const importedNode = document.importNode(this.templateElement.content, true);
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.attach();
  }
  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const projectInput = new ProjectInput();
