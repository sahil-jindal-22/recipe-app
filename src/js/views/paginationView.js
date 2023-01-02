import View from './View.js';
import icons from '../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const curPage = this._data.page;
    const nextPage = curPage + 1;
    const prevPage = curPage - 1;

    // Page 1, other pages
    if (curPage === 1 && numPages > 1) {
      return `
        <button data-goto="${nextPage}" class="btn--inline pagination__btn--next">
          <span>Page ${nextPage}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }
    // Page 1, no other pages
    if (curPage === 1 && numPages < 2) {
      return ``;
    }
    // Page last
    if (curPage === numPages && numPages > 1) {
      return `
       <button data-goto="${prevPage}" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span>Page ${prevPage}</span>
        </button>
      `;
    }
    // Page other
    return `
      <button data-goto="${prevPage}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${prevPage}</span>
      </button>
      <button data-goto="${nextPage}" class="btn--inline pagination__btn--next">
        <span>Page ${nextPage}</span>
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goto = +btn.dataset.goto;

      handler(goto);
    });
  }
}

export default new PaginationView();
