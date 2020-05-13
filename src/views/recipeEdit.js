import { recipes } from "../models/recipe";
import { renderRecipes } from "./recipeList";

const recipeEditWrapper = document.querySelector(".recipe__edit__container");

const generateIngredientsFormDom = (recipe) => {
    const ingredientsForm = document.createElement("form");
    const ingredientsFormInput = document.createElement("input");
    const ingredientsFormButton = document.createElement("button");

    //setup input
    ingredientsFormInput.classList.add("ingredient_form_input");
    ingredientsFormInput.name = "ingredientName";

    //setup form button
    ingredientsFormButton.classList.add("ingredient_form_button");
    ingredientsFormButton.textContent = "Add new";

    //setup form
    ingredientsForm.classList.add("ingredient_form");
    ingredientsForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const elements = e.target.elements;
        recipe.addIngredient({
            name: elements.ingredientName.value,
        });
        elements.ingredientName.value = "";
        recipes.saveRecipes();
        renderRecipes();
        renderEdit();
    });
    ingredientsForm.appendChild(ingredientsFormInput);
    ingredientsForm.appendChild(ingredientsFormButton);

    return ingredientsForm;
};

const generateIngredientDom = (recipe, ingredient) => {
    const ingredientElement = document.createElement("li");
    const ingredientWrapper = document.createElement("div");
    const ingredientCheckbox = document.createElement("input");
    const ingredientBody = document.createElement("p");
    const ingredientRemoveButton = document.createElement("button");

    //setup checkbox
    ingredientCheckbox.type = "checkbox";
    ingredientCheckbox.checked = ingredient.owned;
    ingredientWrapper.addEventListener("click", (e) => {
        ingredient.toggle();
        renderRecipes();
        ingredientCheckbox.checked = ingredient.owned;
    });
    ingredientCheckbox.classList.add("ingredient__element__checkbox");
    ingredientWrapper.appendChild(ingredientCheckbox);
    //setup body
    ingredientBody.innerText = ingredient.name;
    ingredientBody.classList.add("ingredient__element__body");
    ingredientWrapper.appendChild(ingredientBody);
    //setup remove button
    ingredientRemoveButton.innerText = "Remove";
    ingredientRemoveButton.addEventListener("click", (e) => {
        recipe.removeIngredient(ingredient.id);
        recipes.saveRecipes();
        renderEdit();
    });
    ingredientRemoveButton.classList.add("ingredient__element__button--remove");
    ingredientWrapper.appendChild(ingredientRemoveButton);
    //setup wrapper
    ingredientWrapper.classList.add("ingredient__element__wrapper");
    ingredientElement.appendChild(ingredientWrapper);
    ingredientElement.classList.add("ingredient__element");
    return ingredientElement;
};

const generateEditDom = (recipe) => {
    const { id, title, body, ingredients } = recipe;
    const recipeEditEl = document.createElement("div");
    const recipeTitleEl = document.createElement("input");
    const recipeBodyEl = document.createElement("textarea");
    const ingredientsListEl = document.createElement("ul");
    const removeEl = document.createElement("button");
    //setup editEl
    recipeEditEl.classList.add("recipe__edit__wrapper");

    //setup title
    recipeTitleEl.value = title;
    recipeTitleEl.addEventListener("input", (e) => {
        recipes.updateRecipe(id, {
            title: e.target.value,
        });

        renderRecipes();
        // renderEdit();
    });
    recipeTitleEl.classList.add("recipe__title__input");

    //setup body
    recipeBodyEl.value = body;
    recipeBodyEl.addEventListener("input", (e) => {
        recipes.updateRecipe(id, {
            body: e.target.value,
        });
        renderRecipes();
    });
    recipeBodyEl.classList.add("recipe__body__input");

    //setup ingredients
    ingredients.forEach((ingredient) => {
        const ingredientElement = generateIngredientDom(recipe, ingredient);
        ingredientsListEl.appendChild(ingredientElement);
    });
    ingredientsListEl.classList.add("ingredients__list");

    //setup remove
    removeEl.innerText = "Remove 😥";
    removeEl.addEventListener("click", (e) => {
        recipes.removeRecipe(recipe.id);
        renderRecipes();
        location.hash = "";
        clearEdit();
    });
    removeEl.classList.add("recipe__button--remove");

    recipeEditEl.appendChild(recipeTitleEl);
    recipeEditEl.appendChild(recipeBodyEl);
    recipeEditEl.appendChild(ingredientsListEl);
    recipeEditEl.appendChild(generateIngredientsFormDom(recipe));
    recipeEditEl.appendChild(removeEl);

    return recipeEditEl;
};

const renderEdit = () => {
    const recipe = recipes.getRecipe(location.hash.substring(1));
    if (recipe) {
        clearEdit();
        const renderElement = generateEditDom(recipe);
        recipeEditWrapper.appendChild(renderElement);
    } else {
        location.assign("./index.html");
    }
};

const clearEdit = () => (recipeEditWrapper.innerHTML = "");

export { renderEdit };
