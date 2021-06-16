import icons from 'url:../../img/icons.svg';

class SearchView {
  _parentElement = document.querySelector('.search');

  constructor() {
    this._parentElement.querySelector(
      '.search__icon'
    ).firstElementChild.href.baseVal = `${icons}#icon-search`;
  }

  getQuery() {
    const query = this._parentElement.querySelector('.search__field').value;
    this._clearInput();
    return query;
  }

  _clearInput() {
    this._parentElement.querySelector('.search__field').value = '';
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (event) {
      event.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
