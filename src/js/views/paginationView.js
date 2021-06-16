import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handlerFunction) {
    this._parentElement.addEventListener('click', function (event) {
      const btn = event.target.closest('.btn--inline');

      if (!btn) return;

      const { goto } = btn.dataset;
      handlerFunction(+goto);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return this._generateNextMarkupButton(currentPage);
    }
    // Last Page
    if (currentPage === numPages && numPages > 1) {
      return this._generatePreviousMarkupButton(currentPage);
    }

    // Other Page
    if (currentPage < numPages) {
      return `
        ${this._generatePreviousMarkupButton(currentPage)}
        ${this._generateNextMarkupButton(currentPage)}
      `;
    }

    // Page 1, and there are no other pages
    return '';
  }

  _generatePreviousMarkupButton(currentPage) {
    return `
        <button data-goto=${
          currentPage - 1
        } class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${currentPage - 1}</span>
        </button>
        `;
  }

  _generateNextMarkupButton(currentPage) {
    return `
        <button data-goto=${currentPage + 1}
        class="btn--inline pagination__btn--next">
        <span>Page ${currentPage + 1}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
        </svg>
        </button> 
      `;
  }
}

export default new PaginationView();
