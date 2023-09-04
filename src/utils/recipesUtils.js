import prepareJWT from "./PrepareJWT.js";
import jwtDecoder from "jwt-decode";
import axios from "axios";
import RecipesToObjects from "./RecipesToObjects.js";

async function addRecipe(recipe, authHeader) {
    try {
        const jwt = prepareJWT(authHeader());
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        };
        const decodedJWT = jwtDecoder(jwt);
        const url = "http://localhost:8080/api/users/" + decodedJWT.id + "/recipes";
        const response = await axios.post(
            url,
            recipe,
            config
        );
        return response.status === 200;
    } catch (error) {
        console.log(error);
        return false;
    }
}

async function getLikedRecipes(authHeader) {
    try {
        const jwt = prepareJWT(authHeader());
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        }
        const decodedJWT = jwtDecoder(jwt);
        const url = "http://localhost:8080/api/users/" + decodedJWT.id + "/favorites";
        const response = await axios.get(
            url,
            config
        );
        if(response.status === 200) {
            let recipes = RecipesToObjects(response.data);
            recipes.forEach((recipe) => {
                recipe.liked = true;
            });

            return recipes;
        }
        else
            return [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function getMyRecipes(authHeader) {
    try {
        let recipes = [];
        const jwt = prepareJWT(authHeader());
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        };
        const decodedJWT = jwtDecoder(jwt);
        const url = "http://localhost:8080/api/users/" + decodedJWT.id + "/recipes";
        const response = await axios.get(
            url,
            config
        );
        if(response.status === 200) {
            recipes = RecipesToObjects(response.data);
            recipes.forEach((recipe) => {
                recipe.canDelete = true;
            });
        }
        else
            return [];

        const url2 = "http://localhost:8080/api/users/" + decodedJWT.id + "/favorites";
        const response2 = await axios.get(
            url2,
            config
        );
        if(response2.status === 200) {
            let likedRecipes = RecipesToObjects(response2.data);
            recipes.forEach((recipe) => {
                likedRecipes.forEach((likedRecipe) => {
                    if(recipe.id === likedRecipe.id)
                        recipe.liked = true;
                });
            });
        }
        else
            recipes.forEach((recipe) => {
                recipe.liked = false;
            });
        return recipes;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function getAllRecipes(authHeader) {
    try {
        let allRecipes = [];
        const jwt = prepareJWT(authHeader());
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        };
        const response = await axios.get(
            "http://localhost:8080/api/recipes/",
            config
        );
        if(response.status === 200) {
            allRecipes = RecipesToObjects(response.data);
        }
        else
            allRecipes = [];

        const decodedJWT = jwtDecoder(jwt);
        const url = "http://localhost:8080/api/users/" + decodedJWT.id + "/favorites";
        const response2 = await axios.get(
            url,
            config
        );
        if(response2.status === 200) {
            let likedRecipes = RecipesToObjects(response2.data);
            allRecipes.forEach((recipe) => {
                likedRecipes.forEach((likedRecipe) => {
                    if(recipe.id === likedRecipe.id)
                        recipe.liked = true;
                });
            });
        }
        else
            allRecipes.forEach((recipe) => {
                recipe.liked = false;
            });
        return allRecipes;
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function deleteRecipe(recipeId, authHeader) {
    try {
        const jwt = prepareJWT(authHeader());
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        };
        const decodedJWT = jwtDecoder(jwt);
        const url = "http://localhost:8080/api/users/" + decodedJWT.id + "/recipes/" + recipeId;
        const response = await axios.delete(
            url,
            config
        );
        return response.status === 200;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export {getMyRecipes, getAllRecipes, getLikedRecipes, addRecipe, deleteRecipe};