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

const createButtonTemplate = (id, currentAccount) => {
  if (currentAccount?.rentedBooks[id])
    return `<button class="cards__button button js-open-library-card" disabled data-book-id="${id}" type="button">Own</button>`;

  const isLibraryCardBought = currentAccount?.isLibraryCardBought;

  return `<button class="cards__button button ${
    currentAccount !== null
      ? isLibraryCardBought
        ? "js-buy-book"
        : "js-buy-modal-book"
      : "js-signin"
  }" data-book-id="${id}"  type="button">Buy</button>`;
};

const createFavoritesCardTemplate = (
  { id, title, name, author, description, imgSrc },
  currentAccount
) => {
  return `
        <li class="cards__item">
            <div class="cards__inner">
            <article class="cards__content">
                <h3 class="cards__title">${title}</h3>
                <p class="cards__name">${name}</p>
                <p class="cards__author">By ${author}</p>
                <p class="cards__description">${description}</p>
                ${createButtonTemplate(id, currentAccount)}
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

const createFavoritesCardsTemplate = (books, currentAccount) => {
  return Object.entries(books)
    .map(([key, booksValues], index) => {
      return `
        <div class="favorites__cards cards ${
          index === 0 ? "" : "hide"
        } fade js-target" data-target="${key}">
            <ul class="cards__list">${booksValues.map((booksValue) =>
                  createFavoritesCardTemplate(booksValue, currentAccount)).join("")}
            </ul>
          </div>`;
    })
    .join("");
};

const createFavoritesInnerTemplate = (books, currentAccount) => {
  if (!books) return `Книги отсутствуют`;

  return `
        ${createFavoritesRadiosTemplate(books)}
        <div class="favorites__container">
          ${createFavoritesCardsTemplate(books, currentAccount)}
        </div>
    `;
};

const createFavoritesTemplate = (books, currentAccount) => {
  return `
    <section class="favorites" id="favorites">
        <div class="container">
            <h2 class="section-heading">Favorites</h2>
            ${createFavoritesInnerTemplate(books, currentAccount)}
        </div>
    </section>`;
};

export class FavoritesView extends AbstractView {
  #books;
  #currentAccount;

  constructor(books, currentAccount) {
    super();

    this.#books = books;
    this.#currentAccount = currentAccount;
  }

  getTemplate() {
    return createFavoritesTemplate(this.#books, this.#currentAccount);
  }

  #sliderHandlers() {
    const inputs = this.getElement().querySelectorAll(".js-radio-input");
    const targets = this.getElement().querySelectorAll(".js-target");

    inputs.forEach((button) => {
      button.addEventListener("click", (e) => {
        targets.forEach((content) => {
          content.classList.add("fade-out");

          setTimeout(() => {
            content.classList.add("hide");
            content.classList.remove("fade-out");
          }, 500);
        });

        const path = e.currentTarget.dataset.path;

        const selectedSeason = this.getElement().querySelector(
          `[data-target="${path}"]`
        );

        if (selectedSeason) {
          setTimeout(() => {
            selectedSeason.classList.remove("hide");
            selectedSeason.classList.add("fade");
          }, 500);
        }
      });
    });
  }

  #signinHandler = (signinHandler) => {
    const signinItems = this.getElement().querySelectorAll(".js-signin");

    if (signinItems.length > 0) {
      signinItems.forEach((signinItem) => {
        signinItem.addEventListener("click", (e) => {
          e.preventDefault();

          signinHandler();
        });
      });
    }
  };

  #handleBuyModalHandler(handleBuyModalHandler) {
    const buyItems = this.getElement().querySelectorAll(".js-buy-modal-book");

    if (buyItems.length > 0) {
      buyItems.forEach((buyItem) => {
        buyItem.addEventListener("click", (e) => {
          e.preventDefault();

          handleBuyModalHandler();
        });
      });
    }
  }

  #handleBuyHandler(handleBuyHandler) {
    const buyItems = this.getElement().querySelectorAll(".js-buy-book");

    if (buyItems.length > 0) {
      buyItems.forEach((buyItem) => {
        buyItem.addEventListener("click", (e) => {
          e.preventDefault();

          const bookId = e.target.dataset.bookId;
          handleBuyHandler(bookId);
        });
      });
    }
  }

  setHandlers({ signinHandler, handleBuyModalHandler, handleBuyHandler }) {
    this.#sliderHandlers();
    this.#signinHandler(signinHandler);
    this.#handleBuyModalHandler(handleBuyModalHandler);
    this.#handleBuyHandler(handleBuyHandler);
  }
}
