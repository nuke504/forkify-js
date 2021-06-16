import View from './View.js';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnUpload = document.querySelector('.upload__btn');

  _message = 'Recipe was successfully uploaded';

  constructor() {
    // Reset the add recipe icon
    super();
    this._btnOpen.querySelector('use').href.baseVal = `${icons}#icon-edit`;
    this._btnUpload.querySelector(
      'use'
    ).href.baseVal = `${icons}#icon-upload-cloud`;
    this._addHandlerShowWindow();
    this._addHandlerHideWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }

  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }

  _addHandlerHideWindow() {
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerUpload(handlerFunction) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      const data = Object.fromEntries([...new FormData(this)]);
      handlerFunction(data);
    });
  }

  _generateMarkup() {}
}

export default new AddRecipeView();
