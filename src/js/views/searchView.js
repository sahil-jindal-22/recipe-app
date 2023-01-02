class SearchView {
  _parentElement = document.querySelector('.search');
  _input = this._parentElement.querySelector('.search__field');

  _clear() {
    this._input.value = '';
  }

  getQuery() {
    const query = this._input.value;
    this._clear();

    return query;
  }

  addHandlerSearch(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      handler();
    });
  }
}

export default new SearchView();
