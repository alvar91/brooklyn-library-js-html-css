import { AbstractView } from "../../abstract-view.js";

const createHeroViewTemplate = () => {
  return `<section class="hero">
    <div class="container">
      <h3 class="hero__welcome">
        Welcome <br />
        to the Brooklyn Library
      </h3>
    </div>
  </section>`;
};

export class HeroView extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createHeroViewTemplate();
  }
}
