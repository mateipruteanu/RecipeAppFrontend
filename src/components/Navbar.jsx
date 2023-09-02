import React from "react";
import {
    AppBar,
    Avatar,
    Box,
    Divider,
    InputBase,
    ListItemIcon, Menu,
    MenuItem,
    styled,
    Toolbar,
    Typography
} from "@mui/material";
import FoodBankIcon from '@mui/icons-material/FoodBank';
import {Logout, Settings} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {useAuthHeader, useSignOut} from "react-auth-kit";
import prepareJWT from "../utils/PrepareJWT.js";
import jwtDecoder from "jwt-decode";

const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
});

const SearchBar = styled("div") (({theme}) => ({
    backgroundColor:"white",
    padding: "0px 10px",
    borderRadius: theme.shape.borderRadius,
    width: "40%",
}));

const Icons = styled(Box) (({theme}) => ({
    display: "flex",
    alignItems: "center",
    gap: "10px",
}));

function Navbar() {
    const signOut = useSignOut();
    const authHeader = useAuthHeader();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const jwt = jwtDecoder(prepareJWT(authHeader()));
    const username = jwt.sub;



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleLogout = () => {
        setAnchorEl(null);
        try {
            axios.post("http://localhost:8080/api/auth/logout").then((response) => {
                console.log("Logout response: ", response);
            });
        } catch (err) {
            console.log("Error: ", err);
        }

        signOut();
        navigate("/login");
    };

    const handleAccount = () => {
        setAnchorEl(null);
        navigate("/account");
    }

    const handleSettings = () => {
        setAnchorEl(null);
        navigate("/settings");
    }

    const handleHome = () => {
        navigate("/");
    }

    return (
        <AppBar position={"sticky"}>
            <StyledToolbar>
                <Typography variant={"h6"} sx={{display:{xs:"none", sm:"block"}, cursor:"pointer"}} onClick={handleHome}>RecipeApp</Typography>
                <FoodBankIcon sx={{display:{xs:"block", sm:"none"}}}/>
                <SearchBar> <InputBase placeholder={"Search for a recipe..."}/> </SearchBar>
                <Icons onClick={handleClick}
                       aria-controls={open ? 'account-menu' : undefined}
                       aria-haspopup="true"
                       aria-expanded={open ? 'true' : undefined}
                       sx={{cursor:"pointer"}}>
                    <Avatar src={""} />
                    <Typography>{username}</Typography>
                </Icons>
            </StyledToolbar>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={handleAccount}>
                    <Avatar /> My account
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleSettings}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
        </AppBar>
    )
}

export default Navbar;