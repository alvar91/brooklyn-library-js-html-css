import { Observer } from "../utils/observer.js";

export class BooksModel extends Observer {
  constructor() {
    super();

    this._books = null;
    this._currentSeason = 0;
  }

  setIsBooksLoading(updateType, update) {
    this._notify(updateType, update);
  }

  getBooks() {
    return this._books;
  }

  setBooks(updateType, books) {
    this._books = books;

    this._notify(updateType, { isLoading: false });
  }

  setCurrentSeason(season) {
    this._currentSeason = season;
  }

  getCurrentSeason() {
    return this._currentSeason;
  }
}
