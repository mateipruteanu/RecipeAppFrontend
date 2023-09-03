import React, { useState } from "react";
import {
    Box,
    Button,
    Fab,
    MenuItem,
    Modal,
    Paper,
    Stack,
    styled,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import {addRecipe} from "../utils/recipesUtils.js";
import {useAuthHeader} from "react-auth-kit";

const StyledModal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

function AddRecipe() {
    const authHeader = useAuthHeader();
    const [open, setOpen] = useState(false);

    const units = [
        "miligrams",
        "grams",
        "kilograms",
        "liters",
        "milliliters",
        "cups",
        "tablespoons",
        "teaspoons",
        "pieces",
        "none",
    ];

    class Ingredient {
        constructor(id, name, qty, unit) {
            this.id = id;
            this.name = name;
            this.qty = qty;
            this.unit = unit;
        }
    }

    const [ingredients, setIngredients] = useState([]);

    const [newIngredient, setNewIngredient] = useState({
        id: 0,
        name: "",
        qty: 0,
        unit: "none",
    });

    function handleAddIngredient() {
        const newIngredientId = ingredients.length+1;
        setIngredients([...ingredients, newIngredient]);
        setNewIngredient({
            id: newIngredientId,
            name: "",
            qty: 0,
            unit: "none",
        });
    }

    function handleRemoveIngredient(id) {
        const updatedIngredients = ingredients.filter(
            (ingredient) => ingredient.id !== id
        );
        setIngredients(updatedIngredients);
    }

    function handleAddRecipe() {
        const recipeName = document.getElementById("recipe-name").value;
        const recipeDescription = document.getElementById("recipe-description").value;
        const recipeInstructions = document.getElementById("recipe-instructions").value;

        const recipeIngredients = ingredients.map((ingredient) => {
            return {
                ingredient: {
                    name: ingredient.name,
                },
                quantity: ingredient.qty + " " + ingredient.unit
            };
        });

        const recipe = {
            name: recipeName,
            description: recipeDescription,
            instructions: recipeInstructions,
            recipeIngredients: recipeIngredients,
        };

        console.log(recipe);

        addRecipe(recipe, authHeader).then((response) => {
            console.log(response);
        });

        setOpen(false);
    }

    return (
        <>
            <Tooltip
                onClick={() => setOpen(true)}
                title={"Add recipe"}
                sx={{
                    position: "fixed",
                    bottom: 20,
                    left: { xs: "calc(50% - 25px)", md: 30 },
                }}
            >
                <Fab color="primary" aria-label="add">
                    <Add />
                </Fab>
            </Tooltip>

            <StyledModal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box
                    width={800}
                    height={560}
                    bgcolor={"white"}
                    p={3}
                    borderRadius={5}
                    sx={{ overflowY: "auto", "&::-webkit-scrollbar": { display: "none" } }}
                >
                    <Typography variant={"h6"} sx={{ color: "gray", textAlign: "center" }}>
                        Add a new recipe
                    </Typography>
                    <Stack gap={2}>
                        <TextField id="recipe-name" label="Name" />
                        <TextField id="recipe-description" label="Description" />
                        <TextField
                            id="recipe-instructions"
                            label="Instructions"
                            multiline
                            maxRows={4}
                        />
                        <TableContainer component={Paper}>
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="left">Ingredient</TableCell>
                                        <TableCell align="center">Quantity</TableCell>
                                        <TableCell align="right">Unit</TableCell>
                                        <TableCell align="right">Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {ingredients.map((ingredient, index) => (
                                        <TableRow
                                            key={"table-row-" + index}
                                            id={"table-row-" + index}
                                            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <TextField
                                                    id={"ingredient-name-" + ingredient.id}
                                                    label="Ingredient"
                                                    value={ingredient.name}
                                                    onChange={(e) => {
                                                        const updatedIngredients = [...ingredients];
                                                        updatedIngredients[index].name = e.target.value;
                                                        setIngredients(updatedIngredients);
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="center">
                                                <TextField
                                                    id={"ingredient-quantity-" + index}
                                                    label="Quantity"
                                                    type="number"
                                                    value={ingredient.qty}
                                                    onChange={(e) => {
                                                        const updatedIngredients = [...ingredients];
                                                        updatedIngredients[index].qty = e.target.value;
                                                        setIngredients(updatedIngredients);
                                                    }}
                                                />
                                            </TableCell>
                                            <TableCell align="right">
                                                <TextField
                                                    id={"ingredient-unit-" + ingredient.id}
                                                    select
                                                    label="Unit"
                                                    value={ingredient.unit}
                                                    onChange={(e) => {
                                                        const updatedIngredients = [...ingredients];
                                                        updatedIngredients[index].unit = e.target.value;
                                                        setIngredients(updatedIngredients);
                                                    }}
                                                >
                                                    {units.map((option) => (
                                                        <MenuItem id={option} key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </TableCell>
                                            <TableCell align="right">
                                                <Button
                                                    id={"remove-ingredient-" + ingredient.id}
                                                    onClick={() => handleRemoveIngredient(ingredient.id)}
                                                >
                                                    Remove
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell colSpan={4}>
                                            <Button id={"add-ingredient"} onClick={handleAddIngredient}>
                                                Add Ingredient
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Stack>
                    <Button id={"add-recipe-button"} onClick={handleAddRecipe} variant={"contained"}>
                        Add recipe
                    </Button>
                </Box>
            </StyledModal>
        </>
    );
}

export default AddRecipe;
