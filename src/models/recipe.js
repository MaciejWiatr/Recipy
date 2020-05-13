import { v4 as uuid } from "uuid";
import { plainToClass } from "class-transformer";
import { renderEdit } from "../views/recipeEdit";

export const RecipeList = class {
    constructor() {
        this.recipes = [];
    }
    addRecipe(title, body, ingredients) {
        const newRecipe = new Recipe(title, body, ingredients);
        this.recipes.push(newRecipe);
        location.hash = newRecipe.id;
        renderEdit();
        this.saveRecipes();
    }
    removeRecipe(id) {
        const recipeIndex = this.recipes.findIndex(
            (recipe) => recipe.id === id
        );
        this.recipes.splice(recipeIndex, 1);
        this.saveRecipes();
    }
    updateRecipe(id, updates) {
        const recipe = this.getRecipe(id);
        if (typeof updates.title === "string") {
            recipe.title = updates.title;
        }
        if (typeof updates.body === "string") {
            recipe.body = updates.body;
        }
        this.saveRecipes();
    }
    saveRecipes() {
        const recipesJSON = JSON.stringify(this.recipes);
        localStorage.setItem("recipes", recipesJSON);
    }
    loadRecipes() {
        let recipes = localStorage.getItem("recipes");
        recipes = JSON.parse(recipes);
        if (recipes) {
            recipes.forEach((recipe) => {
                const recipeCls = plainToClass(Recipe, recipe);
                recipeCls.ingredients = recipe.ingredients.map((ingr) => {
                    return plainToClass(Ingredient, ingr);
                });
                this.recipes.push(recipeCls);
            });
        } else {
            this.recipes = [];
        }
    }
    getRecipe(id) {
        const recipe = this.recipes.find((recipe) => recipe.id === id);
        return recipe;
    }
    getRecipes() {
        return this.recipes;
    }
};

export const Recipe = class {
    constructor(title, body, ingredients) {
        this.id = uuid();
        this.title = title ? title : "Unnamed recipe";
        this.body = body ? body : "";
        this.ingredients = ingredients ? ingredients : [];
    }
    addIngredient({ name, owned }) {
        const newIngredient = new Ingredient(name, owned);
        this.ingredients.push(newIngredient);
    }
    removeIngredient(id) {
        const ingredientIndex = this.ingredients.findIndex(
            (ingr) => ingr.id === id
        );
        this.ingredients.splice(ingredientIndex, 1);
    }
    getIngredients() {
        return this.ingredients;
    }
    get ownedIngredients() {
        return this.ingredients.filter((ingr) => ingr.owned === true).length;
    }
};

export const Ingredient = class {
    constructor(name, owned = false) {
        this.id = uuid();
        this.name = name;
        this.owned = owned;
    }
    toggle() {
        this.owned = !this.owned;
        recipes.saveRecipes();
    }
};

export const recipes = new RecipeList();
recipes.loadRecipes();
