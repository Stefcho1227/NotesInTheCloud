// Header.jsx
import React from "react";
import { NavLink, useNavigate } from "react-router";
import { logout } from "../api/authApi";
import "./Header.css"

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
        await logout();          // invalidate refresh-token cookie on the server
        navigate("/");           // back to login page
        } catch (e) {
        console.error("Logout failed", e);
        // fallback – clear client token anyway
            navigate("/");
        }
        };
    return (
        <header className='appHeader'>
            <NavLink to='/app/notes'>Notes List</NavLink>
            <NavLink to='/app/todos'>To-Do List</NavLink>
            <button className="logoutBtn" onClick={handleLogout}>
              Log out
            </button>
        </header>
    );
};

export default Header;