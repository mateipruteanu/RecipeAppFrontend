import Navbar from "./Navbar.jsx";
import React from "react";
import {Box, Typography} from "@mui/material";

function Account() {
    return (
        <Box>
            <Navbar />
            <Typography variant={"h1"}>Account</Typography>
        </Box>
    );
}

export default Account;