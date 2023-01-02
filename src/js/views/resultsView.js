import View from './View.js';
import PreviewView from './previewView.js';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found with this keyword. Please try again.';

  _generateMarkup() {
    return this._data.map(recipe => PreviewView.render(recipe, false)).join('');
  }
}

export default new ResultView();
