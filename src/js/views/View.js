import icons from 'url:../../img/icons.svg';

export default class View {
  // Protected attributes
  _data;
  _parentElement;
  _errorMessage;
  _message;

  constructor() {
    if (this.__proto__ === View.prototype) {
      throw new Error('Not allowed to instantiate abstract class');
    }
  }
  /**
   * Render the received object to the DOM by adding the markup to 'afterbegin' of the parent element
   * @param {Object | Object[]} data The data to be rendered (e.g. recipe)
   * @returns {undefined} Does not return any value
   * @this {Object} View Instance
   * @todo Finish Implementation
   */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    if (newElements.length > 0 && newElements.length !== curElements.length) {
      throw new Error(
        'Current Elements array not same length as new element arrays'
      );
    }

    newElements.forEach((newEl, i) => {
      // Get current element
      const curEl = curElements[i];

      // If new element not the same as current element, change the text content
      if (
        !newEl.isEqualNode(curEl) &&
        newEl?.firstChild.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Change attribute if new elem different from current elem
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(attribute =>
          curEl.setAttribute(attribute.name, attribute.value)
        );
      }
    });
  }

  _clear() {
    // Remove the inner HTML first
    this._parentElement.innerHTML = '';
  }

  renderSpinner() {
    const markup = `
    <div class="spinner">
      <svg>
        <use href="${icons}#icon-loader"></use>
      </svg>
    </div>
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-alert-triangle"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
    <div class="error">
      <div>
        <svg>
          <use href="${icons}#icon-smile"></use>
        </svg>
      </div>
      <p>${message}</p>
    </div>
    `;

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  _generateMarkup() {
    throw new Error('_generateMarkup Method not implemented!');
  }
}
