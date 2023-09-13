import { AccountsPresenter } from "../presenters/accounts-presenter.js";

import { Render } from "../utils/render.js";

import { HeaderContainer } from "./containers/header-container/index.js";
import { MainContainer } from "./containers/main-container/main-container.js";
import { FooterContainer } from "./containers/footer-container/index.js";

import { ModalContainer } from "./containers/modal-container/index.js";
import { ModalProfileContainer } from "./containers/modal-profile-container/index.js";
import { FormContainerView } from "./containers/form-container/index.js";
import { ModalBuyContainer } from "./containers/modal-buy-container/index.js";

import { HeaderInnerView } from "./components/header-inner/index.js";
import { HeroView } from "./components/hero/hero.js";
import { AboutView } from "./components/about/index.js";
import { SliderView } from "./components/slider/index.js";
import { FavoritesView } from "./components/favorites/index.js";
import { CoffeeShopView } from "./components/coffee-shop/index.js";
import { OurContactsView } from "./components/our-contacts/index.js";
import { DigitalLibraryCardsView } from "./components/digital-library/digital-library.js";
import { FooterInnerView } from "./components/footer-inner/index.js";
import { BuyAsideView } from "./components/buy-aside/buy-aside.js";

import { ModalProfileInnerView } from "./components/modal-profile-inner/index.js";

import { ModalTitleView } from "./components/modal-title/index.js";

import { InputTextFieldView } from "./components/input-text-field/index.js";
import { InputPasswordFieldView } from "./components/input-password-field/index.js";
import { InputExpirationTextFieldView } from "./components/input-expiration-text-field/index.js";
import { InputCVCTextFieldView } from "./components/input-cvc-text-field/index.js";

import { ErrorsContainerView } from "./containers/errors-container/index.js";
import { FormErrorsView } from "./components/form-errors/index.js";

import { ButtonFilledView } from "./components/button-filled/index.js";

import { BlockSigninView } from "./components/block-signin/index.js";
import { BlockSignupView } from "./components/block-signup/index.js";

import { LoadingView } from "./components/loading-view/index.js";

import {
  RenderPosition,
  MODE,
  ModalTitle,
  FORM,
  ButtonTitle,
} from "../const.js";

export class AppView {
  constructor() {
    this._accountsPresenter = new AccountsPresenter(this);

    this._rootContainer = document.getElementById("root");

    this._headerContainer = new HeaderContainer();
    this._mainContainer = new MainContainer();
    this._footerContainer = new FooterContainer();

    this._formFieldComponents = new Map();

    this.isLoading = false;
  }

  _renderHeaderComponent() {
    const currentAccount = this._accountsPresenter.getCurrentAccount();

    this._headerInnerComponent = new HeaderInnerView(currentAccount);
    Render.render(this._headerContainer, this._headerInnerComponent);

    this._headerInnerComponent.setHandlers({
      signupHandler: this._accountsPresenter.handleSignupClick,
      signinHandler: this._accountsPresenter.handleSigninClick,
      profileHandler: this._accountsPresenter.handleProfileClick,
      logoutHandler: this._accountsPresenter.handleLogoutClick,
    });
  }
  _clearHeaderComponent() {
    if (this._headerInnerComponent) Render.remove(this._headerInnerComponent);
  }

  _renderMainComponent() {
    const currentAccount = this._accountsPresenter.getCurrentAccount();
    const currentSearchAccount =
      this._accountsPresenter.getCurrentSearchAccount();

    this._heroComponent = new HeroView();
    Render.render(this._mainContainer, this._heroComponent);

    this._aboutComponent = new AboutView();
    Render.render(this._mainContainer, this._aboutComponent);

    this._sliderContainer = this._aboutComponent.getSliderPlacementContainer();
    this._sliderComponent = new SliderView();
    Render.render(this._sliderContainer, this._sliderComponent);
    this._sliderComponent.init();

    const books = this._accountsPresenter.getBooks();

    const currentSeason = this._accountsPresenter.getCurrentSeason();

    this._favoritesComponent = new FavoritesView(books, currentAccount, currentSeason);
    Render.render(this._mainContainer, this._favoritesComponent);
    this._favoritesComponent.setHandlers({
      signinHandler: this._accountsPresenter.handleSigninClick,
      handleBuyModalHandler: this._accountsPresenter.handleBuyModalClick,
      handleBuyHandler: this._accountsPresenter.handleBuyClick,
      currentSeasonChangeHandler: this._accountsPresenter.setCurrentSeasonChange,
    });

    this._coffeeShopComponent = new CoffeeShopView();
    Render.render(this._mainContainer, this._coffeeShopComponent);

    this._ourContactsComponent = new OurContactsView();
    Render.render(this._mainContainer, this._ourContactsComponent);

    this._digitalLibraryCardsComponent = new DigitalLibraryCardsView(
      currentAccount,
      currentSearchAccount
    );
    Render.render(this._mainContainer, this._digitalLibraryCardsComponent);

    this._digitalLibraryCardsComponent.setHandlers({
      signupHandler: this._accountsPresenter.handleSignupClick,
      signinHandler: this._accountsPresenter.handleSigninClick,
      profileHandler: this._accountsPresenter.handleProfileClick,
      formSubmitHandler: this._accountsPresenter.handleFormSubmitClick,
    });
  }
  _clearMainComponent() {
    Render.remove(this._mainContainer);
  }

  _renderFooterComponent() {
    this._footerInnerComponent = new FooterInnerView();
    Render.render(this._footerContainer, this._footerInnerComponent);
  }
  _clearFooterComponent() {
    if (this._footerInnerComponent) Render.remove(this._footerInnerComponent);
  }

  _renderProfile() {
    const currentAccount = this._accountsPresenter.getCurrentAccount();
    const books = this._accountsPresenter.getBooks();

    const container = this._modalComponent.getModalContainer();

    this._modalProfileInnerComponent = new ModalProfileInnerView(
      currentAccount,
      books
    );
    Render.render(container, this._modalProfileInnerComponent);

    this._modalProfileInnerComponent.setHandlers();
  }
  _clearProfile() {
    if (this._modalProfileInnerComponent)
      Render.remove(this._modalProfileInnerComponent);
  }

  _renderBuyForm() {
    const formFields = this._accountsPresenter.getFormFields();
    const fieldComponents = formFields.map((field) =>
      this._createFieldComponent(field)
    );

    const formContainer = this._modalComponent.getModalFormContainer();
    this._formContainerComponent = new FormContainerView();
    Render.render(
      formContainer,
      this._formContainerComponent,
      RenderPosition.AFTERBEGIN
    );
    fieldComponents.forEach((fieldComponent) => {
      this._renderFormField(this._formContainerComponent, fieldComponent);
    });
    this._renderBuyButton();

    this._asideContainer = this._modalComponent.getModalAsideContainer();
    this._buyAsideComponent = new BuyAsideView();

    Render.render(this._asideContainer, this._buyAsideComponent);

    this._asideErrorsContainer = this._buyAsideComponent.getAsideContainer();

    this._errorsContainer = new ErrorsContainerView();
    Render.render(this._asideErrorsContainer, this._errorsContainer);
    this._renderFormErrors();
  }
  _clearBuyForm() {
    if (this._modalBuyInnerComponent)
      Render.remove(this._modalBuyInnerComponent);
  }

  // Forms
  _renderFormField(container, fieldComponent) {
    Render.render(container, fieldComponent);
  }

  _renderFormErrors() {
    const container = this._errorsContainer;

    const errors = this._accountsPresenter.getErrorMessages();
    this._formErrorsComponent = new FormErrorsView(errors);

    Render.render(container, this._formErrorsComponent);
  }

  _renderSignupForm() {
    const formFields = this._accountsPresenter.getFormFields();
    const fieldComponents = formFields.map((field) =>
      this._createFieldComponent(field)
    );

    const container = this._modalComponent.getModalContainer();

    this._modalTitleComponent = new ModalTitleView(ModalTitle.signup);
    Render.render(container, this._modalTitleComponent);

    this._formContainerComponent = new FormContainerView();
    Render.render(container, this._formContainerComponent);
    fieldComponents.forEach((fieldComponent) => {
      this._renderFormField(this._formContainerComponent, fieldComponent);
    });

    this._errorsContainer = new ErrorsContainerView();
    Render.render(container, this._errorsContainer);
    this._renderFormErrors();

    this._renderSignupButton();

    this._blockSigninComponent = new BlockSigninView();
    Render.render(container, this._blockSigninComponent);
    this._blockSigninComponent.setHandlers({
      signinHandler: this._accountsPresenter.handleSigninClick,
    });
  }
  _clearSignupForm() {
    if (this._modalTitleComponent) Render.remove(this._modalTitleComponent);

    if (this._formContainerComponent)
      Render.remove(this._formContainerComponent);

    if (this._signupButtonComponent) Render.remove(this._signupButtonComponent);

    if (this._blockSigninComponent) Render.remove(this._blockSigninComponent);
  }

  _renderSigninForm() {
    const formFields = this._accountsPresenter.getFormFields();
    const fieldComponents = formFields.map((field) =>
      this._createFieldComponent(field)
    );

    const container = this._modalComponent.getModalContainer();

    this._modalTitleComponent = new ModalTitleView(ModalTitle.signin);
    Render.render(container, this._modalTitleComponent);

    this._formContainerComponent = new FormContainerView();
    Render.render(container, this._formContainerComponent);
    fieldComponents.forEach((fieldComponent) => {
      this._renderFormField(this._formContainerComponent, fieldComponent);
    });

    this._errorsContainer = new ErrorsContainerView();
    Render.render(container, this._errorsContainer);
    this._renderFormErrors();

    this._renderSigninButton();

    this._blockSignupComponent = new BlockSignupView();
    Render.render(container, this._blockSignupComponent);
    this._blockSignupComponent.setHandlers({
      signupHandler: this._accountsPresenter.handleSignupClick,
    });
  }
  _clearSigninForm() {
    if (this._modalTitleComponent) Render.remove(this._modalTitleComponent);

    if (this._formContainerComponent)
      Render.remove(this._formContainerComponent);

    if (this._signupButtonComponent) Render.remove(this._signupButtonComponent);

    if (this._blockSignupComponent) Render.remove(this._blockSignupComponent);
  }

  _renderSigninButton() {
    const container = this._formContainerComponent;

    const isFormValid = this._accountsPresenter
      .getFormFields()
      .some((field) => field.required && !field.isValid);

    this._signinButtonComponent = new ButtonFilledView(
      ButtonTitle.signin,
      isFormValid
    );

    this._signinButtonComponent.setClickHandler(
      this._accountsPresenter.handleSigninSubmitClick
    );

    Render.render(container, this._signinButtonComponent);
  }

  _renderSignupButton() {
    const container = this._formContainerComponent;

    const isFormValid = this._accountsPresenter
      .getFormFields()
      .some((field) => field.required && !field.isValid);

    this._signupButtonComponent = new ButtonFilledView(
      ButtonTitle.signup,
      isFormValid
    );

    this._signupButtonComponent.setClickHandler(
      this._accountsPresenter.handleSignupSubmitClick
    );

    Render.render(container, this._signupButtonComponent);
  }

  _renderBuyButton() {
    const container = this._formContainerComponent;

    const isFormValid = this._accountsPresenter
      .getFormFields()
      .some((field) => field.required && !field.isValid);

    this._buyButtonComponent = new ButtonFilledView(
      ButtonTitle.buy,
      isFormValid
    );

    this._buyButtonComponent.setClickHandler(
      this._accountsPresenter.handleBuySubmitClick
    );

    Render.render(container, this._buyButtonComponent);
  }

  setSignupViewState = (state) => {
    if (this._signupButtonComponent) {
      this._signupButtonComponent.setViewState(state);
    }
  };

  _createTextInput(field) {
    const inputTextComponent = new InputTextFieldView(field);

    inputTextComponent.setChangeHandler(
      this._accountsPresenter.handleFieldChange
    );

    this._formFieldComponents.set(field.id, inputTextComponent);

    return inputTextComponent;
  }

  _createPasswordInput(field) {
    const inputPasswordComponent = new InputPasswordFieldView(field);

    inputPasswordComponent.setChangeHandler(
      this._accountsPresenter.handleFieldChange
    );

    this._formFieldComponents.set(field.id, inputPasswordComponent);

    return inputPasswordComponent;
  }

  _createExpirationTextInput(field) {
    const inputExpirationTextComponent = new InputExpirationTextFieldView(
      field
    );

    inputExpirationTextComponent.setChangeHandler(
      this._accountsPresenter.handleFieldChange
    );

    this._formFieldComponents.set(field.id, inputExpirationTextComponent);

    return inputExpirationTextComponent;
  }

  _createCVCInput(field) {
    const inputCVCComponent = new InputCVCTextFieldView(field);

    inputCVCComponent.setChangeHandler(
      this._accountsPresenter.handleFieldChange
    );

    this._formFieldComponents.set(field.id, inputCVCComponent);

    return inputCVCComponent;
  }

  _createFieldComponent(field) {
    switch (field.type) {
      case FORM.inputText:
        return this._createTextInput(field);
      case FORM.inputPassword:
        return this._createPasswordInput(field);
      case FORM.expirationCode:
        return this._createExpirationTextInput(field);
      case FORM.CVC:
        return this._createCVCInput(field);
      default:
        return null;
    }
  }

  _clearFormFields() {
    this._formFieldComponents.forEach((component) => Render.remove(component));
    this._formFieldComponents.clear();
  }

  // Inner Modal
  _renderInnerModal(currentModalMode) {
    switch (currentModalMode) {
      case MODE.signup:
        this._renderSignupForm();
        return;
      case MODE.signin:
        this._renderSigninForm();
        return;
      case MODE.profile:
        this._renderProfile();
        return;
      case MODE.buy:
        this._renderBuyForm();
        return;
      default:
        break;
    }
  }
  _clearInnerModal(currentModalMode) {
    this._clearFormFields();

    switch (currentModalMode) {
      case MODE.signup:
        this._clearSignupForm();
        return;
      case MODE.signin:
        this._clearSigninForm();
      case MODE.profile:
        this._clearProfile();
      case MODE.buy:
        this._clearBuyForm();
      default:
        break;
    }
  }

  // Modal
  _renderModal() {
    const currentModalMode = this._accountsPresenter.getCurrentModalMode();
    if (!currentModalMode) return;

    if (currentModalMode === MODE.profile) {
      this._modalComponent = new ModalProfileContainer();
    } else if (currentModalMode === MODE.buy) {
      this._modalComponent = new ModalBuyContainer();
    } else this._modalComponent = new ModalContainer();

    document.addEventListener(
      `keydown`,
      this._accountsPresenter.escKeyDownHandler
    );

    this._modalComponent.setCloseModalClickHandler(
      this._accountsPresenter.handleCloseModal
    );

    Render.render(document.body, this._modalComponent);
    this._renderInnerModal(currentModalMode);

    const paddingOffset = window.innerWidth - document.body.offsetWidth + "px";
    document.body.style.paddingRight = paddingOffset;
    document.body.style.overflow = "hidden";
  }
  _clearModal = () => {
    const currentModalMode = this._accountsPresenter.getCurrentModalMode();

    if (this._modalComponent) {
      Render.remove(this._modalComponent);
    }

    document.body.style.overflow = "auto";
    document.body.style.paddingRight = 0;
    document.removeEventListener(`keydown`, this._escKeyDownHandler);

    this._clearInnerModal(currentModalMode);
  };

  clearMajor() {
    if (this._loadingComponent) {
      Render.remove(this._loadingComponent);
    }

    this.clearMinor();

    this._clearHeaderComponent();

    this._clearMainComponent();

    this._clearFooterComponent();
  }

  _renderLoading() {
    this._loadingComponent = new LoadingView();

    Render.render(this._rootContainer, this._loadingComponent);
  }

  _renderFormErrors() {
    const container = this._errorsContainer;

    const errors = this._accountsPresenter.getErrorMessages();
    this._formErrorsComponent = new FormErrorsView(errors);

    Render.render(container, this._formErrorsComponent);
  }

  renderMajor({ isLoading } = {}) {
    if (isLoading !== undefined) {
      this.isLoading = isLoading;
    }

    if (this.isLoading) {
      this._renderLoading();
      return;
    }

    Render.render(this._rootContainer, this._headerContainer);
    this._renderHeaderComponent();

    Render.render(this._rootContainer, this._mainContainer);
    this._renderMainComponent();

    Render.render(this._rootContainer, this._footerContainer);
    this._renderFooterComponent();
  }

  updateMajor(data) {
    this.clearMajor();
    this.renderMajor(data);
  }

  clearMinor() {
    this._clearModal();
  }

  renderMinor() {
    this._renderModal();
  }

  updateMinor(data) {
    this.clearMinor();
    this.renderMinor(data);
  }

  _replaceFieldComponent(fieldComponents, fieldId) {
    const oldFieldComponent = fieldComponents.get(fieldId);
    const newFieldComponent = this._createFieldComponent(
      this._accountsPresenter.getFormField(fieldId)
    );

    Render.replace(newFieldComponent, oldFieldComponent);
    Render.remove(oldFieldComponent);

    fieldComponents.delete(fieldId);
    fieldComponents.set(fieldId, newFieldComponent);
  }

  clearPatch() {
    if (this._formErrorsComponent) {
      Render.remove(this._formErrorsComponent);
    }

    if (this._signupButtonComponent) {
      Render.remove(this._signupButtonComponent);
    }

    if (this._signinButtonComponent) {
      Render.remove(this._signinButtonComponent);
    }

    if (this._buyButtonComponent) {
      Render.remove(this._buyButtonComponent);
    }
  }

  renderPatch() {
    this._renderFormErrors();

    const currentModalMode = this._accountsPresenter.getCurrentModalMode();

    if (currentModalMode === MODE.signup) {
      this._renderSignupButton();
    } else if (currentModalMode === MODE.signin) {
      this._renderSigninButton();
    } else if (currentModalMode === MODE.buy) {
      this._renderBuyButton();
    }
  }

  updatePatch(data) {
    if (this._formFieldComponents.has(data.id)) {
      this._replaceFieldComponent(this._formFieldComponents, data.id);
    }

    this.clearPatch();
    this.renderPatch(data);
  }

  init() {
    this.renderMajor();
    this._accountsPresenter.init();
  }
}
