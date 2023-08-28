import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    Link,
    TextField,
    Typography
} from "@mui/material";
import {AccountBox} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

function Signup(props) {
    const [error, setError] = useState("");
    const signIn = useSignIn();
    const navigate = useNavigate();

    const onSubmit = async (values) => {
        console.log("Values: ", values);
        setError("");

        try {
            const response = await axios.post(
                "http://localhost:8080/api/auth/register",
                values
            );

            signIn({
                token: response.data.authenticationToken,
                expiresIn: 3600,
                tokenType: "Bearer",
                authState: { username: values.username,
                             id: values.id
                },
            });
        } catch (err) {
            if (err && err instanceof AxiosError)
                setError(err.response?.data.message);
            else if (err && err instanceof Error) setError(err.message);

            console.log("Error: ", err);
        }
    };

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",

        },
        onSubmit,
    });

    return (
        <Container>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <AccountBox />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Create a new account
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Button
                            fullWidth
                            variant={"outlined"}
                            onClick={() => navigate("/login")}
                        >
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>

        </Container>
    );
}

export { Signup };