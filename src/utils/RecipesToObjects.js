function RecipesToObjects(recipesJSON) {
    let recipes = [];
    recipesJSON.forEach(recipe => {
        let recipeObj = {
            id: recipe.id,
            name: recipe.name,
            addedBy: recipe.addedBy,
            description: recipe.description,
            instructions: recipe.instructions,
            recipeIngredients: recipe.recipeIngredients,
            liked: false,
            canDelete: false,
        }
        recipes.push(recipeObj);
    });
    return recipes;
}

export default RecipesToObjects;