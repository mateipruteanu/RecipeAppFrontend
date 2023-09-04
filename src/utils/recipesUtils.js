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
            let recipes = RecipesToObjects(response.data);
            recipes.forEach((recipe) => {
                recipe.canDelete = true;
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

async function getAllRecipes(authHeader) {
    try {
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
            return RecipesToObjects(response.data);
        }
        else
            return [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export {getMyRecipes, getAllRecipes, getLikedRecipes, addRecipe};