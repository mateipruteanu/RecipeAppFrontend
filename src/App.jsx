import './App.css'
import {Route, Routes} from "react-router-dom";
import {Home} from "./components/Home"
import {Login} from "./components/Login"
import {Signup} from "./components/Signup.jsx";
import { RequireAuth } from 'react-auth-kit';
import Account from "./components/Account.jsx";
import Settings from "./components/Settings.jsx";

function App() {

  return (
    <div>
        <Routes>
            <Route path="/" element={
            <RequireAuth loginPath={"/login"}>
                <Home />
            </RequireAuth>
            } />
            <Route path="/account" element={
                <RequireAuth loginPath={"/login"}>
                    <Account />
                </RequireAuth>
            } />
            <Route path="/settings" element={
                <RequireAuth loginPath={"/login"}>
                    <Settings />
                </RequireAuth>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    </div>
  )
}

export default App
