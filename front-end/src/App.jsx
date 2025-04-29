import React from "react";
import {Routes, Route} from "react-router";
import LogIn from "./pages/LogIn";
import Register from "./pages/Register";
import Notes from "./pages/Notes";

function App() {
    return (
        <Routes>
            <Route path = "/" element={<LogIn/>}/>
            <Route path = "/register" element={<Register/>}/>
            <Route path = "/notes" element={<Notes/>}/>
        </Routes>
    );
}

export default App;