// Header.jsx
import React from "react";
import { NavLink } from "react-router";
import "./Header.css"

const Header = () => {
    return (
        <header className='appHeader'>
            <NavLink to='/app/notes'>Notes List</NavLink>
            <NavLink to='/app/todos'>To-Do List</NavLink>
        </header>
    );
};

export default Header;