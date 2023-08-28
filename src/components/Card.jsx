import React from "react";
import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Collapse, Paper, Table, TableBody,
    TableCell,
    TableContainer, TableHead, TableRow,
    Typography
} from "@mui/material";
import {ExpandMore} from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";


function CustomCard(props) {
    const [expanded, setExpanded] = React.useState(false);

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
                <CardActions>
                    <ExpandMore
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </ExpandMore>
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