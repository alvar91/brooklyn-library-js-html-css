import { AbstractView } from "../../abstract-view.js";

const createFavoritesRadioTemplate = (key, index) => {
  return `
        <li class="radios__item">
            <input type="radio" class="radios__input js-radio-input" name="favorites" id="${key}" data-path="${key}" ${
    index === 0 ? "checked" : ""
  } />
            <label for="${key}" class="radios__wrapper">
                <span class="radios__dot"></span>
                <span class="radios__text">${key}</span>
            </label>
        </li>`;
};

const createFavoritesRadiosTemplate = (books) => {
  return `
    <div class="favorites__radios radios">
        <h3 class="radios__title">Pick favorites of season</h3>
        <form class="radios__form" action="#">
            <ul class="radios__list">${Object.keys(books)
              .map((key, index) => createFavoritesRadioTemplate(key, index))
              .join("")}</ul>
        </form>
    </div>`;
};

const createButtonTemplate = (id, rentedBooks) => {
  if (rentedBooks && rentedBooks[id])
    return `<button class="cards__button button js-open-library-card" disabled type="button">Own</button>`;

  return `<button class="cards__button button js-open-library-card" type="button">Buy</button>`;
};

const createFavoritesCardTemplate = (
  { id, title, name, author, description, imgSrc },
  rentedBooks
) => {
  return `
        <li class="cards__item">
            <div class="cards__inner">
            <article class="cards__content">
                <h3 class="cards__title">${title}</h3>
                <p class="cards__name">${name}</p>
                <p class="cards__author">${author}</p>
                <p class="cards__description">${description}</p>
                ${createButtonTemplate(id, rentedBooks)}
            </article>
            </div>

            <a href="#">
            <picture>
                <source type="image/webp" srcset="${imgSrc}.webp" />
                <img
                class="cards__image"
                src="${imgSrc}.jpg"
                alt="Изображение The ${name} By ${author}"
                loading="lazy"
                />
            </picture>
            </a>
        </li>`;
};

const createFavoritesCardsTemplate = (books, rentedBooks) => {
  return Object.entries(books)
    .map(([key, booksValues], index) => {
      return `

        <div class="favorites__cards cards">
            <div class="cards__block ${
              index === 0 ? "active-target" : ""
            } js-target" data-target="${key}">
                <ul class="cards__list">${booksValues
                  .map((booksValue) =>
                    createFavoritesCardTemplate(booksValue, rentedBooks)
                  )
                  .join("")}</ul>
            </div>
          </div>`;
    })
    .join("");
};

const createFavoritesInnerTemplate = (books, rentedBooks) => {
  if (!books) return `Книги отсутствуют`;

  return `
        ${createFavoritesRadiosTemplate(books)}
        <div class="favorites__container">
          ${createFavoritesCardsTemplate(books, rentedBooks)}
        </div>
    `;
};

const createFavoritesTemplate = (books, rentedBooks) => {
  return `
    <section class="favorites" id="favorites">
        <div class="container">
            <h2 class="section-heading">Favorites</h2>
            ${createFavoritesInnerTemplate(books, rentedBooks)}
        </div>
    </section>`;
};

export class FavoritesView extends AbstractView {
  #books;
  #rentedBooks;

  constructor(books, rentedBooks) {
    super();

    this.#books = books;
    this.#rentedBooks = rentedBooks;
  }

  getTemplate() {
    return createFavoritesTemplate(this.#books, this.#rentedBooks);
  }

  setHandlers() {
    const inputs = this.getElement().querySelectorAll(".js-radio-input");
    const targets = this.getElement().querySelectorAll(".js-target");

    inputs.forEach((button) => {
      button.addEventListener("click", (e) => {
        targets.forEach((content) => {
          content.classList.remove("active-target");
        });

        const path = e.currentTarget.dataset.path;

        this.getElement()
          .querySelector(`[data-target="${path}"]`)
          .classList.add("active-target");
      });
    });
  }
}
