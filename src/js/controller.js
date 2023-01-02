import * as Model from './model.js';
import { WINDOW_CLOSE_SEC } from './config.js';
import RecipeView from './views/recipeView.js';
import SearchView from './views/searchView.js';
import ResultsView from './views/resultsView.js';
import PaginationView from './views/paginationView.js';
import BookmarkView from './views/bookmarksView.js';
import AddRecipeView from './views/addRecipeView.js';
import addRecipeView from './views/addRecipeView.js';

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    RecipeView.renderSpinner();

    // 0. Add active state to the preview
    ResultsView.update(Model.getSearchResultsPage());
    BookmarkView.update(Model.state.bookmarks);

    // 1. Loading recipe
    await Model.loadRecipe(id);

    // 2. Render recipe
    RecipeView.render(Model.state.recipe);
  } catch (err) {
    RecipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 0. Render spinner
    ResultsView.renderSpinner();

    // 1. Get query
    const query = SearchView.getQuery();

    if (!query) return;

    // 2. Load results
    await Model.loadSearchResults(query);

    // 3. Render results
    ResultsView.render(Model.getSearchResultsPage());

    // 4. Render initial pagination
    PaginationView.render(Model.state.search);
  } catch (err) {
    console.error(err);
    ResultsView.renderError();
  }
};

const controlPagination = function (goto) {
  // 1. Render new results
  ResultsView.render(Model.getSearchResultsPage(goto));

  // 2. Render new pagination
  PaginationView.render(Model.state.search);
};

const controlUpdateServings = function (newServings) {
  // 1. update servings in state
  Model.updateServings(newServings);

  // 2. render the recipe again
  RecipeView.update(Model.state.recipe);
};

const controlUpdateBookmark = function () {
  if (Model.state.recipe.bookmarked === false) {
    // Add bookmark in state
    Model.addBookmark(Model.state.recipe);
  } else {
    // Remove bookmark from state
    Model.removeBookmark(Model.state.recipe.id);
  }

  // Update the recipe view
  RecipeView.update(Model.state.recipe);

  // Render the updated bookmarks
  BookmarkView.render(Model.state.bookmarks);
};

const controlBookmarks = function () {
  // Get bookmarks from local storage
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

  if (!bookmarks) return;

  // Update bookmarks to state
  Model.state.bookmarks = bookmarks;

  // Render bookmarks
  BookmarkView.render(Model.state.bookmarks);
};

const controlAddRecipe = async function (recipe) {
  try {
    // Render spinner
    addRecipeView.renderSpinner();

    // Upload recipe, update state
    await Model.addRecipe(recipe);

    // Change URL
    window.history.pushState(null, '', `#${Model.state.recipe.id}`);

    // Update the recipe view
    RecipeView.render(Model.state.recipe);

    // Store recipe to bookmarks, save bookmarks
    Model.addBookmark(Model.state.recipe);

    // Update the bokmark view
    BookmarkView.render(Model.state.bookmarks);

    // Show succes message
    addRecipeView.renderMessage();

    // Close the window
    setTimeout(function () {
      addRecipeView.closeWindow();
    }, WINDOW_CLOSE_SEC * 1000);
  } catch (err) {
    addRecipeView.renderError(err.message);
    console.error(`💥💥💥 ${err.message}`);
  }
};

const init = function () {
  RecipeView.addHandlerRender(controlRecipes);
  RecipeView.addHandlerUpdateServing(controlUpdateServings);
  RecipeView.addHandlerUpdateBookmark(controlUpdateBookmark);
  SearchView.addHandlerSearch(controlSearchResults);
  PaginationView.addHandlerClick(controlPagination);
  BookmarkView.addHandlerRender(controlBookmarks);
  AddRecipeView.addHandlerAddRecipe(controlAddRecipe);
};

init();
