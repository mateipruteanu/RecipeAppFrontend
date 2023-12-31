import React, {useEffect} from "react";
import {Box, Container, Divider, List, Stack, Typography} from "@mui/material";
import axios from "axios";
import prepareJWT from "../utils/PrepareJWT.js";
import {useAuthHeader} from "react-auth-kit";
import RecipesToObjects from "../utils/RecipesToObjects.js";
import {getAllRecipes, getMyRecipes, getLikedRecipes} from "../utils/recipesUtils.js";
import CustomCard from "./CustomCard.jsx";

function Feed({selectedOption}) {
    const authHeader = useAuthHeader();
    const [loading, setLoading] = React.useState(true);
    const [feedRecipes, setFeedRecipes] = React.useState([]);
    useEffect(() => {
        console.log("Selected option: ", selectedOption);
        switch(selectedOption) {
            case "all-recipes":
                getAllRecipes(authHeader)
                    .then((recipes) => {
                        setFeedRecipes(recipes);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        setFeedRecipes(["error"]);
                        setLoading(false);
                    });
                break;
            case "my-recipes":
                getMyRecipes(authHeader)
                    .then((recipes) => {
                        setFeedRecipes(recipes);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        setFeedRecipes(["error"]);
                        setLoading(false);
                    });
                break;
            case "liked-recipes":
                getLikedRecipes(authHeader)
                    .then((recipes) => {
                        setFeedRecipes(recipes);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                        setFeedRecipes(["error"]);
                        setLoading(false);
                    });
                break;
            default:
                setFeedRecipes(["error"]);
        }
    }, [selectedOption]);


    return (
        <Box bgcolor={""} flex={6} p={2}>
            <Typography variant={"h4"} textAlign={"center"}>Recipes</Typography>
            {loading && <Typography variant={"h6"} textAlign={"center"}>Loading...</Typography>}
            <Stack direction="column"
                   spacing={2}
                   justifyContent="center"
            >
                {feedRecipes.map((recipe) => {
                    return (
                        <CustomCard
                            key={recipe.id}
                            id={recipe.id}
                            name={recipe.name}
                            subheader={"Added by " + recipe.addedBy}
                            description={recipe.description}
                            instructions={recipe.instructions}
                            recipeIngredients={recipe.recipeIngredients}
                            liked={recipe.liked}
                            canDelete={recipe.canDelete}
                            authHeader={authHeader}
                        />
                    )
                })}
            </Stack>
        </Box>
    )
}

export default Feed;