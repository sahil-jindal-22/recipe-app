import View from './View.js';
import icons from '../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');
  _window = document.querySelector('.add-recipe-window');
  _showWindowBtn = document.querySelector('.nav__btn--add-recipe');
  _closeWindowBtn = document.querySelector('.btn--close-modal');
  _overlay = document.querySelector('.overlay');
  _errorMessage =
    'There was some problem in uploading the recipe. Please try again later.';
  _message = 'The recipe was uploaded successfully!';

  constructor() {
    super();

    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  closeWindow() {
    this._window.classList.add('hidden');
    this._overlay.classList.add('hidden');
  }

  showWindow() {
    this._window.classList.remove('hidden');
    this._overlay.classList.remove('hidden');
  }

  _addHandlerShowWindow() {
    this._showWindowBtn.addEventListener('click', this.showWindow.bind(this));
  }

  _addHandlerCloseWindow() {
    this._closeWindowBtn.addEventListener('click', this.closeWindow.bind(this));
    this._overlay.addEventListener('click', this.closeWindow.bind(this));
  }

  addHandlerAddRecipe(handler) {
    this._parentElement.addEventListener('submit', function (e) {
      e.preventDefault();

      const dataArr = [...new FormData(this)];

      const data = Object.fromEntries(dataArr);

      handler(data);
    });
  }
}

export default new AddRecipeView();
