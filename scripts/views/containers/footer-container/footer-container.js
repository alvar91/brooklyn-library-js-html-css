import { AbstractView } from "../../abstract-view.js";

const createFooterContainerTemplate = () => {
  return `
    <footer class="footer"></footer>
  `;
};

export class FooterContainer extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createFooterContainerTemplate();
  }
}
