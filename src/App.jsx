import { useState } from 'react'
import './App.css'
import {Container,  TextField} from "@mui/material";
import {Route, Routes} from "react-router-dom";
import {Home} from "./components/Home"
import {Login} from "./components/Login"
import {Signup} from "./components/Signup.jsx";
import { RequireAuth } from 'react-auth-kit';

function App() {

  return (
    <Container>
        <Routes>

            <Route path="/" element={
            <RequireAuth loginPath={"/login"}>
                <Home />
            </RequireAuth>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    </Container>
  )
}

export default App
