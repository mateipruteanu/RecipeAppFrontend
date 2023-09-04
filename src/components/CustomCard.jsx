import React from "react";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardHeader, Checkbox,
    Collapse, IconButton, Paper, Table, TableBody,
    TableCell,
    TableContainer, TableHead, TableRow,
    Typography
} from "@mui/material";
import {Delete, ExpandMore, Favorite, FavoriteBorder} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {likeRecipe, unlikeRecipe} from "../utils/likeUtils.js";
import {deleteRecipe} from "../utils/recipesUtils.js";



function CustomCard(props) {
    const [expanded, setExpanded] = React.useState(false);
    const [liked, setLiked] = React.useState(props.liked || false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    console.log("PROPS: ", props);

    const ingredients = props.recipeIngredients.map((element) => {
        return (
            <TableRow key={element.id}>
                <TableCell>{element.ingredient.name}</TableCell>
                <TableCell>{element.quantity}</TableCell>
            </TableRow>
        )
    });

    const handleLike = () => {
        const recipe = {
            id: props.id,
            name: props.name,
            description: props.description,
            instructions: props.instructions,
            recipeIngredients: props.recipeIngredients,
        }
        if(liked) {
            if(unlikeRecipe(recipe, props.authHeader)) {
                console.log("Unliked recipe: ", recipe);
                setLiked(false);
            }

        }
        else {
            if(likeRecipe(recipe, props.authHeader)) {
                console.log("Liked recipe: ", recipe);
                setLiked(true);
            }
        }
    }

    const handleDelete = () => {
        if(deleteRecipe(props.id, props.authHeader)) {
            console.log("Deleted recipe: ", props.id);
        }
    }


    return (
        <Card>
            <CardHeader
                title={props.name}
                subheader={props.subheader}
            />
            <CardContent>
                <Typography variant="body1">
                    {props.description}
                </Typography>
                <CardActions sx={{justifyContent:"space-between"}}>
                    <Box>
                        <IconButton
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                        <Checkbox
                            checked={liked}
                            onChange={handleLike}
                            inputProps={{ 'aria-label': 'controlled' }}
                            id={"like-checkbox-"+props.id}
                            icon={<FavoriteBorder />}
                            checkedIcon={<Favorite />}
                        />
                    </Box>
                    {props.canDelete &&
                        <IconButton aria-label="delete" onClick={handleDelete}>
                            <Delete />
                        </IconButton>}
                </CardActions>

                <Collapse in={expanded} timeout="auto" unmountOnExit>

                    <CardContent>
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Ingredient</TableCell>
                                        <TableCell>Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ingredients}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <Typography variant={"h5"}>Instructions: </Typography>
                        <Typography>
                            {props.instructions}
                        </Typography>
                    </CardContent>

                </Collapse>
            </CardContent>
        </Card>
    )
}

export default CustomCard;