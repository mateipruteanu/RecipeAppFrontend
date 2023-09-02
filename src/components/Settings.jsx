import Navbar from "./Navbar.jsx";
import React from "react";
import {Box, Typography} from "@mui/material";

function Settings() {
    return (
        <Box>
            <Navbar />
            <Typography variant={"h1"}>Settings</Typography>
        </Box>
    );
}

export default Settings;