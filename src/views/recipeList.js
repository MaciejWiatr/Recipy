import { recipes as RecipeList } from "../models/recipe";
import { renderEdit } from "./recipeEdit";
import { getFilters } from "../models/filters";
const recipeListWrapper = document.querySelector(".recipe__list_wrapper");

const generateListItemDom = (recipe) => {
    const { id, title, body, ingredients } = recipe;
    const recipeItem = document.createElement("div");
    recipeItem.classList.add("recipe__item");
    const titleEl = document.createElement("p");
    titleEl.textContent = title;
    recipeItem.appendChild(titleEl);
    // const editEl = document.createElement("button");
    // editEl.textContent = "Edit";
    recipeItem.addEventListener("click", (e) => {
        location.hash = id;
        renderEdit();
    });
    //setup ingredient summary
    const recipeItemSummary = document.createElement("p");
    recipeItemSummary.classList.add("recipe__item__summary");
    recipeItemSummary.textContent = `You have ${recipe.ownedIngredients} out of ${recipe.ingredients.length} ingredients needed`;
    recipeItem.appendChild(recipeItemSummary);
    // recipeItem.appendChild(editEl);
    return recipeItem;
};

const renderRecipes = () => {
    clearRecipes();
    let recipes = RecipeList.getRecipes();
    const { query } = getFilters();
    if (query) {
        recipes = recipes.filter((rec) =>
            rec.title.toLowerCase().includes(query.toLowerCase())
        );
    }
    recipes.forEach((recipe) => {
        const recipeItem = generateListItemDom(recipe);
        recipeListWrapper.appendChild(recipeItem);
    });
};

const clearRecipes = () => (recipeListWrapper.innerHTML = "");

export { renderRecipes };
