import { Observer } from "../utils/observer.js";

export class AccountsModel extends Observer {
  constructor() {
    super();

    this._accounts = [];

    this._currentAccount = null;
    this._currentSearchAccount = null;

    this._currentModalMode = null;
  }

  setIsAccountsLoading(updateType, update) {
    this._notify(updateType, update);
  }

  getAccount(id) {
    return this._accounts[id];
  }

  setAccount(updateType, account) {
    const accounts = this._accounts.slice();
    accounts.push(account);

    this._accounts = accounts;

    this._currentAccount = account;
    this._currentModalMode = null;

    this._notify(updateType, { isLoading: false });
  }

  getAccounts() {
    return this._accounts;
  }

  getAccountsCount() {
    return this._accounts.length;
  }

  setAccounts(updateType, accounts) {
    this._accounts = accounts.slice();

    this._notify(updateType, { isLoading: false });
  }

  setCurrentAccount(updateType, response) {
    this._currentAccount = response;

    this._notify(updateType, { isLoading: false });
  }

  getCurrentAccount() {
    return this._currentAccount;
  }

  resetCurrentAccount(updateType) {
    this._currentAccount = null;
    this._notify(updateType);
  }

  setCurrentModalMode(updateType, currentModalMode) {
    this._currentModalMode = currentModalMode;
    this._notify(updateType, { isLoading: false });
  }

  getCurrentModalMode() {
    return this._currentModalMode;
  }

  setCurrentSearchAccount(updateType, account) {
    this._currentSearchAccount = account;

    this._notify(updateType, { isLoading: false });
  }

  getCurrentSearchAccount() {
    return this._currentSearchAccount;
  }

  resetCurrentSearchAccountWithDelay = (updateType, timeDelay) => {
    setTimeout(() => {
      this._currentSearchAccount = null;

      this._notify(updateType, { isLoading: false });
    }, timeDelay);
  };

  resetCurrentModalMode(updateType) {
    this._currentModalMode = null;
    this._notify(updateType);
  }
}
