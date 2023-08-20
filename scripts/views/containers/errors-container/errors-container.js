import { AbstractView } from "../../abstract-view.js";

const createErrorsContainerTemplate = () => {
  return `
    <div class="errors-container"></div>
  `;
};

export class ErrorsContainerView extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createErrorsContainerTemplate();
  }

  getErrorsContainer() {
    return document.querySelector(`.errors-container`);
  }
}
