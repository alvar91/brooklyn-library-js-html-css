import { AbstractView } from "../../abstract-view.js";

const createAboutTemplate = () => {
  return `
        <section class="about" id="about">
            <div class="container">
                <h2 class="section-heading">About</h2>
                <p class="about__text">
                    The Brooklyn Library is a free workspace, a large number of books
                    and a cozy coffee shop inside
                </p>
                <div class="js-slider-placement-container"></div>
            </div>
        </section>`;
};

export class AboutView extends AbstractView {
  constructor() {
    super();
  }

  getSliderPlacementContainer() {
    return this.getElement().querySelector(`.js-slider-placement-container`);
  }

  getTemplate() {
    return createAboutTemplate();
  }
}
