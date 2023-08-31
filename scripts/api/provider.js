import Utils from "../utils/common.js";
import { CARD_NUMBER_LENGTH } from "../const.js";

export default class Provider {
  constructor(store) {
    this._store = store;
  }

  async addAccount(newAccount) {
    if (this._getIsItemPersisted({ key: "accounts" })) {
      const accountByEmail = await this._getAccountByEmail(newAccount.email);

      if (accountByEmail)
        return Promise.reject(
          new Error(`Аккаунт с таким email уже существует`)
        );

      newAccount = Object.assign(newAccount, {
        cardNumber: Utils.generateRandomHex(CARD_NUMBER_LENGTH),
        rentedBooks: {},
        visits: 1,
        bonuses: 1240,
        // books: 0,
        isLibraryCardBought: false,
      });

      return Promise.resolve(newAccount).then((account) => {
        const accountId = account.cardNumber;

        this._updateAccount(accountId, account);
        return account;
      });
    }

    return Promise.reject(new Error(`Ошибка при создании аккаунта`));
  }

  _isEmailExist(email) {
    const accountsValues = this.getAccounts();

    return accountsValues.includes(email);
  }

  _isCardNumberExist(cardNumber) {
    const accountsValues = this.getAccounts();

    return accountsValues.includes(cardNumber);
  }

  async _getAccountByCardNumber(accountCardNumber) {
    const accountsEntries = await this.getEntriesAccount();

    return accountsEntries?.find(
      ([_, { cardNumber }]) => cardNumber === accountCardNumber.toUpperCase()
    );
  }

  async _getAccountByEmail(accountEmail) {
    const accountsEntries = await this.getEntriesAccount();

    return accountsEntries?.find(
      ([_, { email }]) => email === accountEmail.toLowerCase()
    );
  }

  async _getAccountsLength() {
    const accounts = await this.getAccounts();

    return accounts.length;
  }

  async getAccount(authData) {
    if (this._getIsItemPersisted({ key: "accounts" })) {
      const { emailOrReaderCard, password } = authData;

      const [accountIdByEmail, accountByEmail] =
        (await this._getAccountByEmail(emailOrReaderCard)) || [];

      if (accountByEmail?.password === password) {
        const incrementedAccount = this._incrementVisits(accountByEmail);

        this._updateAccount(accountIdByEmail, incrementedAccount);

        return Promise.resolve(incrementedAccount);
      }

      const [accountIdCardNumber, accountByCardNumber] =
        (await this._getAccountByCardNumber(emailOrReaderCard)) || [];

      if (accountByCardNumber?.password === password) {
        const incrementedAccount = this._incrementVisits(accountByCardNumber);

        this._updateAccount(accountIdCardNumber, incrementedAccount);

        return Promise.resolve(incrementedAccount);
      }
    }

    return Promise.reject(new Error(`Запрашиваемый аккаунт не найден`));
  }

  async searchAccount(submitData) {
    if (this._getIsItemPersisted({ key: "accounts" })) {
      const { firstName, secondName, cardNumber } = submitData;

      const [_, accountByCardNumber] =
        (await this._getAccountByCardNumber(cardNumber)) || [];

      if (
        accountByCardNumber?.firstName === firstName?.toLowerCase() &&
        accountByCardNumber?.secondName === secondName?.toLowerCase()
      ) {
        return Promise.resolve(accountByCardNumber);
      }
    }

    return Promise.reject(new Error(`Запрашиваемый аккаунт не найден`));
  }

  _incrementVisits(account) {
    account = Object.assign({}, account);
    account.visits++;

    return account;
  }

  _updateAccount(accountId, account) {
    if (this._getIsItemPersisted({ key: "accounts" })) {
      this.setItem({
        key: "accounts",
        subKey: accountId,
        value: account,
      });

      return;
    }

    return Promise.reject(new Error(`Ошибка обновления аккаунта`));
  }

  getEntriesAccount() {
    if (this._getIsItemPersisted({ key: "accounts" })) {
      return Promise.resolve(
        Object.entries(this._store.getItem({ key: "accounts" }))
      );
    }

    return Promise.reject(new Error(`Ошибка загрузки аккаунтов`));
  }

  getAccounts() {
    if (this._getIsItemPersisted({ key: "accounts" })) {
      return Promise.resolve(
        Object.values(this._store.getItem({ key: "accounts" }))
      );
    }

    return Promise.reject(new Error(`Ошибка загрузки аккаунтов`));
  }

  getBooks() {
    if (this._getIsItemPersisted({ key: "books" })) {
      return Promise.resolve(this._store.getItem({ key: "books" }));
    }

    return Promise.reject(new Error(`Ошибка загрузки книг`));
  }

  _getIsItemPersisted({ key, subKey }) {
    if (key && subKey) {
      return !!this._store.getItem({ key, subKey });
    }

    if (key) {
      return !!this._store.getItem({ key });
    }

    return false;
  }

  setItem(params) {
    this._store.setItem(params);
  }

  resetStorage() {
    this._store.resetStorage();
  }

  buyLibraryCard(account) {
    const newAccount = Object.assign(account, {
      isLibraryCardBought: true,
    });

    return Promise.resolve(newAccount).then((account) => {
      const accountId = account.cardNumber;

      this._updateAccount(accountId, account);
      return account;
    });
  }

  buyBook(currentAccount, bookId) {
    const newAccount = Object.assign({}, currentAccount);

    newAccount.rentedBooks[bookId] = true;

    return Promise.resolve(newAccount).then((account) => {
      const accountId = account.cardNumber;

      this._updateAccount(accountId, account);
      return account;
    });
  }
}
