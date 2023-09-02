import React, {useState} from "react";
import Sidebar from "./Sidebar.jsx";
import Feed from "./Feed.jsx";
import {Box, Stack} from "@mui/material";
import Navbar from "./Navbar.jsx";
import AddRecipe from "./AddRecipe.jsx";

function Home() {
    const [selectedOption, setSelectedOption] = useState("all-recipes");
    const handleSidebarClick = (option) => {
        setSelectedOption(option);
    };

    return (
        <Box>
            <Navbar />
            <Stack direction={"row"} spacing={2} justify-content="space-between">
                <Sidebar onSelect={handleSidebarClick} selectedOption={selectedOption}/>
                <Feed selectedOption={selectedOption} />
            </Stack>
            <AddRecipe />
        </Box>
    )
}

export {Home};