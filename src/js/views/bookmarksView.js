import icons from 'url:../../img/icons.svg';
import PreviewView from './previewView.js';

class BookmarksView extends PreviewView {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = `No recipes yet. Find a nice recipe and bookmark it ;)`;
  _message = ``;

  addHandlerRender(handler) {
    window.addEventListener('load', handler());
  }

  constructor() {
    // Reset the bookmarks icon
    super();
    document
      .querySelector('.nav__btn--bookmarks')
      .querySelector('use').href.baseVal = `${icons}#icon-bookmark`;

    this._parentElement.querySelector(
      'use'
    ).href.baseVal = `${icons}#icon-smile`;
  }
}

export default new BookmarksView();
