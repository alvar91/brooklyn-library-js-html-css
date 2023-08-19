import { AbstractView } from "../../abstract-view.js";

const createOurContactsTemplate = () => {
  return `
    <section class="contacts" id="contacts">
      <div class="container">
        <h2 class="section-heading">Our Contacts</h2>
        <div class="contacts__inner">
          <div class="contacts__block">
            <h3 class="contacts__title">For all Library inquiries:</h3>
            <ul class="contacts__list">
              <li class="contacts__item">
                Please call
                <a class="link" href="tel:6177302370">(617) 730-2370</a>
              </li>
              <li class="contacts__item">
                For TTY service, please call
                <a class="link" href="tel:6177302370">(617) 730-2370</a>
              </li>
              <li class="contacts__item">
                Putterham Library:
                <a class="link" href="tel:617730-2385">(617) 730-2385</a>
              </li>
            </ul>

            <h3 class="contacts__title contacts__title--last">
              Senior Staff
            </h3>
            <ul class="contacts__list">
              <li class="contacts__item">
                Library Director:
                <a
                  class="contacts__mail link"
                  href="mailto:amandaHirst@gmail.com"
                  >Amanda Hirst</a
                >
              </li>
            </ul>
          </div>
          <iframe
            class="contacts__frame"
            src="https://maps.google.com/maps?width=696&amp;height=414&amp;hl=en&amp;q=286%20cadman%20plaza+(My%20Business%20Name)&amp;t=&amp;z=18&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          ></iframe>
        </div>
      </div>
    </section>`;
};

export class OurContactsView extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createOurContactsTemplate();
  }
}
