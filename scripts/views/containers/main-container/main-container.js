import { AbstractView } from "../../abstract-view.js";

const createMainContainerTemplate = () => {
  return `<main class="main js-main-container"></main>`;
};

export class MainContainer extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createMainContainerTemplate();
  }
}
