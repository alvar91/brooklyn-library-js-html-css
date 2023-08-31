import { AbstractView } from "../../abstract-view.js";
import Utils from "../../../utils/common.js";

const createInitialsTemplate = (firstName, lastName) => {
  return `<div class="profile-info__avatar">${Utils.getInitials(
    firstName,
    lastName
  )}</div>`;
};

const createRentedBooksTemplate = (rentedBooks, booksList) => {
  const rentedBooksKeys = Object.keys(rentedBooks);
  const booksListValues = Object.values(booksList)
    .flat()
    .filter(({ id }) => rentedBooks[id]);

  if (!rentedBooksKeys.length)
    return `<li class="rented__item">Нет арендованных книг</li>`;

  return booksListValues
    .map(
      ({ name, author }) => `<li class="rented__item">${name}, ${author}</li>`
    )
    .join("");
};

const createModalProfileInnerTemplate = (currentAccount, booksList) => {
  const {
    firstName,
    lastName,
    bonuses,
    visits,
    rentedBooks,
    cardNumber,
  } = currentAccount;

  return `
    <div class="popup__inner-card">
        <div class="popup__card">
            <div class="popup__profile-info profile-info">
                ${createInitialsTemplate(firstName, lastName)}
                <p class="profile-info__name">${firstName} ${lastName}</p>
            </div>
        </div>
        <div class="popup__container popup__container--profile">
            <button class="popup__close-btn popup__close-btn--profile js-modal-close""></button>

            <div class="popup__inner">
                <h3 class="popup__heading popup__heading--profile">My profile</h3>
            
                <ul class="popup__list">
                    <li class="popup__item statistics">
                        <span class="statistics__title statistics__title--big">Visits</span>
                        <img class="statistics__icon" src="./img/stat-profile.svg" alt="Иконка пользователя" />
                        <span class="statistics__title">${visits}</span>
                    </li>
            
                    <li class="popup__item statistics">
                        <span class="statistics__title statistics__title--big" >Bonuses</span>
                        <img class="statistics__icon" src="./img/stat-bonuses.svg" alt="Иконка бонусов" />
                        <span class="statistics__title">${bonuses}</span>
                    </li>
            
                    <li class="popup__item statistics">
                        <span class="statistics__title statistics__title--big">Books</span>
                        <img class="statistics__icon" src="./img/stat-books.svg" alt="Иконка книги"/>
                        <span class="statistics__title">${Object.keys(rentedBooks).length}</span>
                    </li>
                </ul>
            
                <div class="popup__rented rented">
                    <p class="rented__text">Rented books</p>
                    <ul class="rented__list">
                            ${createRentedBooksTemplate(rentedBooks, booksList)}
                    </ul>
                </div>
            
                <div class="popup__card-number">
                    <span class="popup__card-title">Card number</span>
                    <span class="popup__number">${cardNumber}</span>
                    <button class="popup__clipboard js-clipboard"></button>
                </div>
            </div>
        </div>
    </div>`;
};

export class ModalProfileInnerView extends AbstractView {
  constructor(currentAccount, books) {
    super();

    this._currentAccount = currentAccount;
    this._books = books;
  }

  getTemplate() {
    return createModalProfileInnerTemplate(this._currentAccount, this._books);
  }

  setHandlers() {
    const clipBoard = this.getElement().querySelector(".js-clipboard");

    clipBoard.addEventListener("click", (e) => {
      e.preventDefault();

      const { cardNumber } = this._currentAccount;
      if (cardNumber) {
        navigator.clipboard.writeText(cardNumber);
        Utils.toast("Скопировано в буфер обмена");
      }
    });
  }
}
