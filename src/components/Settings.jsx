import Navbar from "./Navbar.jsx";
import React from "react";
import {Box, Container, List, ListItem, ListItemButton, ListItemIcon, Switch, Typography} from "@mui/material";
import {ModeNight} from "@mui/icons-material";

function Settings() {
    return (
        <Box>
            <Navbar />
            <Container sx={{display:"flex", justifyContent:"center"}}>
                <List>
                    <ListItem>
                        <Typography variant={"h3"} alignItems={"center"}>Settings</Typography>
                    </ListItem>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <ModeNight />
                            </ListItemIcon>
                            <Switch />
                        </ListItemButton>
                    </ListItem>
                </List>
            </Container>
        </Box>
    );
}

export default Settings;