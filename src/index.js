import { renderRecipes } from "./views/recipeList";
import { recipes } from "./models/recipe";
import "reflect-metadata";
import { updateFilters } from "./models/filters";

document
    .querySelector(".new__recipe__button")
    .addEventListener("click", (e) => {
        recipes.addRecipe();
        renderRecipes();
    });

document.querySelector(".search__input").addEventListener("input", (e) => {
    updateFilters({
        query: e.target.value,
    });
    renderRecipes();
});

location.hash = "";
renderRecipes();
