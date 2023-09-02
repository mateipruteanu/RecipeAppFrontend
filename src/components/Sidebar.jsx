import React from "react";
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {Favorite, LunchDining, Person} from "@mui/icons-material";

function Sidebar({onSelect, selectedOption}) {

    return (
        <Box bgcolor={""} flex={1} p={2} sx={{display:{xs: "none", sm: "block"}}}>
            <Box position={"fixed"}>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton component={"a"} href={"#all-recipes"} selected={selectedOption === "all-recipes"}
                                        onClick={() => onSelect("all-recipes")}>
                            <ListItemIcon>
                                <LunchDining />
                            </ListItemIcon>
                            <ListItemText primary="All recipes" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={"a"} href={"#my-recipes"} selected={selectedOption === "my-recipes"}
                                        onClick={() => onSelect("my-recipes")}>
                            <ListItemIcon>
                                <Person />
                            </ListItemIcon>
                            <ListItemText primary="My recipes" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton component={"a"} href={"#liked-recipes"} selected={selectedOption === "liked-recipes"}
                                        onClick={() => onSelect("liked-recipes")}>
                            <ListItemIcon>
                                <Favorite />
                            </ListItemIcon>
                            <ListItemText primary="Liked recipes" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Box>
        </Box>
    )
}

export default Sidebar;