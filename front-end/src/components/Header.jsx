// Header.jsx
import React from "react";
import { NavLink } from "react-router";

const Header = () => {
    return (
        <header className='appHeader'>
            <NavLink to='/notes'>Notes List</NavLink>
            <NavLink to='/todos'>To-Do List</NavLink>
        </header>
    );
};

export default Header;