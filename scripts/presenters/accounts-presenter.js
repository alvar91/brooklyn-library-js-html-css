import {
  MODE,
  UpdateType,
  InitiateSignupFormsFields,
  InitiateSigninFormsFields,
  InitiateBuyFormsFields,
  UserAction,
  TIME_DELAY_IN_MS,
} from "../const.js";

import Store from "../api/store.js";
import Provider from "../api/provider.js";

import { AccountsModel } from "../models/accounts-model.js";
import { BooksModel } from "../models/books-model.js";
import { FormModel } from "../models/form-model.js";

import Utils from "../utils/common.js";

import { FieldTitle, State, STORE_NAME } from "../const.js";

import { validationMethods, formatInput } from "../utils/validate.js";

const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(store);

export class AccountsPresenter {
  constructor(view) {
    this._view = view;

    this._api = apiWithProvider;

    this._accountsModel = new AccountsModel();
    this._accountsModel.addObserver(this._handleModelEvent);

    this._booksModel = new BooksModel();
    this._booksModel.addObserver(this._handleModelEvent);

    this._formSignupModel = new FormModel(InitiateSignupFormsFields);
    this._formSignupModel.addObserver(this._handleModelEvent);

    this._formSigninModel = new FormModel(InitiateSigninFormsFields);
    this._formSigninModel.addObserver(this._handleModelEvent);

    this._formBuyModel = new FormModel(InitiateBuyFormsFields);
    this._formBuyModel.addObserver(this._handleModelEvent);
  }

  // Handlers
  _handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this._view.updatePatch(data);
        break;

      case UpdateType.MINOR:
        this._view.updateMinor(data);
        break;

      case UpdateType.MAJOR:
        this._view.updateMajor(data);
        break;
    }
  };

  handleSignupClick = () => {
    this.handleCloseModal();

    this._accountsModel.setCurrentModalMode(UpdateType.MINOR, MODE.signup);
  };

  handleSigninClick = () => {
    this.handleCloseModal();

    this._accountsModel.setCurrentModalMode(UpdateType.MINOR, MODE.signin);
  };

  handleProfileClick = () => {
    // this.handleCloseModal();

    this._accountsModel.setCurrentModalMode(UpdateType.MINOR, MODE.profile);
  };

  handleLogoutClick = () => {
    this.handleCloseModal();

    this._accountsModel.resetCurrentAccount(UpdateType.MAJOR);
  };

  handleBuyModalClick = () => {
    this._accountsModel.setCurrentModalMode(UpdateType.MINOR, MODE.buy);
  };

  handleBuySubmitClick = () => {
    this.handleCloseModal();

    const currentAccount = this.getCurrentAccount();

    this._fetchBuyLibraryCard(UpdateType.MAJOR, currentAccount);
  };

  handleBuyClick = (bookId) => {
    const currentAccount = this.getCurrentAccount();

    this._fetchBuyBook(currentAccount, bookId);
  };

  handleCloseModal = () => {
    const currentFormModel = this._getCurrentFormModel();

    if (Array.isArray(currentFormModel)) {
      currentFormModel.forEach((currentFormModel) => {
        if (currentFormModel) {
          currentFormModel.resetFields();
          currentFormModel.resetError();
        }
      });
    } else {
      if (currentFormModel) {
        currentFormModel.resetFields();
        currentFormModel.resetError();
      }
    }

    this._accountsModel.resetCurrentModalMode(UpdateType.MINOR);
  };

  escKeyDownHandler = (evt) => {
    Utils.addEscapeEvent(evt, this.handleCloseModal);
  };

  handleSignupSubmitClick = () => {
    const currentFormModel = this._getCurrentFormModel();

    const newAccount = currentFormModel.mapFieldsForServer();

    this._handleViewAction(
      UserAction.ADD_NEW_ACCOUNT,
      UpdateType.MAJOR,
      newAccount
    );
  };

  handleSigninSubmitClick = () => {
    const currentFormModel = this._getCurrentFormModel();
    const dataAccount = currentFormModel.mapFieldsForServer();

    this._handleViewAction(
      UserAction.GET_ACCOUNT,
      UpdateType.MAJOR,
      dataAccount
    );
  };

  handleFormSubmitClick = (submitData) => {
    this._fetchSearchAccount(UpdateType.MAJOR, submitData);
  }

  // Api
  _fetchAccounts() {
    this._accountsModel.setIsAccountsLoading(UpdateType.MAJOR, {
      isLoading: true,
    });

    this._api
      .getAccounts()
      .then((response) => {
        this._accountsModel.setAccounts(UpdateType.MAJOR, response);
      })
      .catch((e) => {
        console.error(e.message);
        Utils.toast(e.message);
        this._accountsModel.setAccounts(UpdateType.MAJOR, []);
      });
  }

  _fetchAccount(updateType, accountData) {
    this._accountsModel.setIsAccountsLoading(updateType, {
      isLoading: true,
    });

    this._api
      .getAccount(accountData)
      .then((account) => {
        this._accountsModel.setCurrentAccount(updateType, account);
      })
      .catch((e) => {
        console.error(e.message);
        Utils.toast(e.message);
        this._accountsModel.setCurrentAccount(updateType, null);
      });
  }

  _fetchNewAccount(updateType, newAccount) {
    this._accountsModel.setIsAccountsLoading(updateType, {
      isLoading: true,
    });

    this._api
      .addAccount(newAccount)
      .then((response) => {
        this._accountsModel.setAccount(updateType, response);
      })
      .catch((e) => {
        console.error(e.message);
        Utils.toast(e.message);

        const accounts = this._accountsModel.getAccounts();
        this._accountsModel.setAccounts(updateType, accounts);
      })
      .finally(() => {
        this._view.setSignupViewState(State.ABORTING);
      });
  }

  _fetchBooks() {
    this._booksModel.setIsBooksLoading(UpdateType.MAJOR, {
      isLoading: true,
    });

    this._api
      .getBooks()
      .then((response) => {
        this._booksModel.setBooks(UpdateType.MAJOR, response);
      })
      .catch((e) => {
        console.error(e.message);
        Utils.toast(e.message);
        this._booksModel.setBooks(UpdateType.MAJOR, null);
      });
  }

  _fetchBuyLibraryCard(updateType, currentAccount) {
    this._accountsModel.setIsAccountsLoading(updateType, {
      isLoading: true,
    });

    this._api
      .buyLibraryCard(currentAccount)
      .then((account) => {
        this._accountsModel.setCurrentAccount(updateType, account);
      })
      .catch((e) => {
        console.error(e.message);
        Utils.toast(e.message);
        this._accountsModel.setCurrentAccount(updateType, null);
      });
  }

  _fetchBuyBook(currentAccount, bookId) {
    this._accountsModel.setIsAccountsLoading(UpdateType.MAJOR, {
      isLoading: true,
    });

    this._api
      .buyBook(currentAccount, bookId)
      .then((account) => {
        this._accountsModel.setCurrentAccount(UpdateType.MAJOR, account);
      })
      .catch((e) => {
        console.error(e.message);
        Utils.toast(e.message);
        this._accountsModel.setCurrentAccount(updateType, null);
      });
  }

  _fetchSearchAccount(updateType, submitData) {
    this._accountsModel.setIsAccountsLoading(UpdateType.MAJOR, {
      isLoading: true,
    });

    this._api
      .searchAccount(submitData)
      .then((account) => {
        this._accountsModel.setCurrentSearchAccount(updateType, account);

        this._resetCurrentSearchAccountWithDelay(updateType, TIME_DELAY_IN_MS);
      })
      .catch((e) => {
        console.error(e.message);
        Utils.toast(e.message);
        this._accountsModel.setCurrentAccount(updateType, null);
      });
  }

  _resetCurrentSearchAccountWithDelay(updateType, timeDelay) {
    this._accountsModel.resetCurrentSearchAccountWithDelay(updateType, timeDelay);
  };

  // Form validation
  _validateField(field) {
    const currentFormModel = this._getCurrentFormModel();

    if (!field.required) return true;

    if (!field) {
      throw new Error(`Can't find nonexistent field: ${field}`);
    }

    const validationField = field.validation;

    for (const method in validationField) {
      const errorMessage = field.validation[method];

      if (
        validationField.hasOwnProperty(method) &&
        !validationMethods(method, field) &&
        !field.deletedField
      ) {
        currentFormModel.setError(errorMessage);
        return false;
      }

      currentFormModel.deleteError(errorMessage);
    }

    return true;
  }

  _getCurrentFormModel = () => {
    if (this.getCurrentModalMode() === MODE.signup) {
      return this._formSignupModel;
    }

    if (this.getCurrentModalMode() === MODE.signin) {
      return this._formSigninModel;
    }

    if (this.getCurrentModalMode() === MODE.profile) {
      return [this._formSignupModel, this._formSigninModel];
    }

    if (this.getCurrentModalMode() === MODE.buy) {
      return this._formBuyModel;
    }

    return null;
  };

  handleFieldChange = (fieldId, value) => {
    const currentFormModel = this._getCurrentFormModel();
    const field = currentFormModel?.getField(fieldId);

    if (!field) {
      // throw new Error(`Can't find nonexistent field: ${field}`);
      return;
    }

    if (
      [
        FieldTitle.firstName,
        FieldTitle.lastName,
        FieldTitle.bankCardNumber,
        // FieldTitle.expirationCode,
        FieldTitle.CVC,
        FieldTitle.cardholderName,
        FieldTitle.postalCode,
        FieldTitle.city,
      ].includes(field.title)
    ) {
      value = formatInput(value);
    }

    if([FieldTitle.email].includes(field.title)) value = value.toLowerCase();

    field.value = value;
    field.isTouched = true;

    const isValid = this._validateField(field);
    field.isValid = isValid;

    currentFormModel.updateField(UpdateType.PATCH, field);
  };

  _handleViewAction(actionType, updateType, accountData) {
    switch (actionType) {
      case UserAction.ADD_NEW_ACCOUNT:
        this._fetchNewAccount(updateType, accountData);
        break;
      case UserAction.GET_ACCOUNT:
        this._fetchAccount(updateType, accountData);
        break;
    }
  }

  getCurrentModalMode() {
    return this._accountsModel.getCurrentModalMode();
  }

  getFormField(fieldId) {
    const currentFormModel = this._getCurrentFormModel();

    return currentFormModel.getField(fieldId);
  }

  getFormFields() {
    if (this.getCurrentModalMode() === MODE.signup)
      return this._formSignupModel.getFields();
    if (this.getCurrentModalMode() === MODE.signin)
      return this._formSigninModel.getFields();
    if (this.getCurrentModalMode() === MODE.buy)
      return this._formBuyModel.getFields();

    return null;
  }

  getErrorMessages() {
    const currentFormModel = this._getCurrentFormModel();

    return currentFormModel.getErrorMessages();
  }

  resetCurrentModalMode() {
    return this._accountsModel.resetCurrentModalMode();
  }

  getCurrentAccount() {
    return this._accountsModel.getCurrentAccount();
  }

  getAccounts() {
    return this._accountsModel.getAccounts();
  }

  getBooks() {
    return this._booksModel.getBooks();
  }

  setCurrentSeasonChange = (season) => {
    this._booksModel.setCurrentSeason(season);
  }

  getCurrentSeason() {
    return this._booksModel.getCurrentSeason();
  }

  getCurrentSearchAccount() {
    return this._accountsModel.getCurrentSearchAccount();
  }

  init() {
    this._fetchBooks();
    this._fetchAccounts();
  }
}
