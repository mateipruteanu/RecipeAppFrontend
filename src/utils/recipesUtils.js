import prepareJWT from "./PrepareJWT.js";
import jwtDecoder from "jwt-decode";
import axios from "axios";
import RecipesToObjects from "./RecipesToObjects.js";

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
            return RecipesToObjects(response.data);
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
            return RecipesToObjects(response.data);
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

export {getMyRecipes, getAllRecipes, getLikedRecipes};