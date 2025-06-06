// Header.jsx
import React from "react";
import { NavLink } from "react-router";

const Header = () => {
    return (
        <header className='appHeader'>
            <NavLink to='/app/notes'>Notes List</NavLink>
            <NavLink to='/app/todos'>To-Do List</NavLink>
        </header>
    );
};

export default Header;