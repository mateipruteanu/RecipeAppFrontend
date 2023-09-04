import prepareJWT from "./PrepareJWT.js";
import jwtDecoder from "jwt-decode";
import axios from "axios";

async function likeRecipe(recipe, authHeader) {
    try {
        const jwt = prepareJWT(authHeader());
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        };
        const decodedJWT = jwtDecoder(jwt);
        const url = "http://localhost:8080/api/users/" + decodedJWT.id + "/favorites";
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

async function unlikeRecipe(recipe, authHeader) {
    try {
        const jwt = prepareJWT(authHeader());
        const config = {
            headers: {
                Authorization: `Bearer ${jwt}`,
            }
        };
        const decodedJWT = jwtDecoder(jwt);
        const url = "http://localhost:8080/api/users/" + decodedJWT.id + "/favorites/" + recipe.id;
        const response = await axios.delete(
            url,
            config
        );
        return response.status === 200;
    }
    catch (error) {
        console.log(error);
        return false;
    }
}

export {likeRecipe, unlikeRecipe};