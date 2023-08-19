import { AbstractView } from "../../abstract-view.js";

const createFooterInnerTemplate = () => {
  return `
    <div class="container">
        <div class="footer__top">
            <div class="footer__block">
                <address class="footer__address">
                    <a class="link" href="http://maps.google.com/?q=286CadmanPlazaNewYorkNY11238UnitedStates">
                    286 Cadman Plaza, New York, NY 11238, United States</a>
                </address>
                <ul class="socials">
                    <li class="socials__item">
                        <a class="socials__link" href="#">
                            <svg class="icon">
                            <use
                                xlink:href="img/socials-icons.svg#twitter"
                                aria-label="Изображение иконки twitter"
                            ></use>
                            </svg>
                        </a>
                    </li>
                    <li class="socials__item">
                        <a class="socials__link" href="#">
                            <svg class="icon">
                            <use
                                xlink:href="img/socials-icons.svg#instagram"
                                aria-label="Изображение иконки instagram"
                            ></use>
                            </svg>
                        </a>
                    </li>
                    <li class="socials__item">
                        <a class="socials__link" href="#">
                            <svg class="icon">
                            <use
                                xlink:href="img/socials-icons.svg#facebook"
                                aria-label="Изображение иконки facebook"
                            ></use>
                            </svg>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="footer__block">
                <ul class="footer__list">
                    <li class="footer__item">
                        Mon - Fri<br />
                        08:00 am - 07:00 pm
                    </li>
                    <li class="footer__item">
                        Sat - Sun<br />
                        10:00 am - 06:00 pm
                    </li>
                </ul>
            </div>
        </div>
        <div class="footer__bottom">
            <p class="footer__year">2023</p>
                <a class="footer__school link" href="https://rs.school/js-stage0">The Rolling Scopes School</a>
                <a class="footer__author link" href="https://github.com/alvar91">Aleksey Varov</a>
        </div>
    </div>
  `;
};

export class FooterInnerView extends AbstractView {
  constructor() {
    super();
  }

  getTemplate() {
    return createFooterInnerTemplate();
  }
}
