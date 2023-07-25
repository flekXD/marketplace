import React from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css"

const NavLinks = props => {
    return (
    <ul className="nav-links">
        <li>
            <NavLink to="/catalog">Catalog</NavLink>
        </li>
        <li>
            <NavLink to="/user/list">Me</NavLink>
        </li>
        <li>
            <NavLink to="/user/cart">Cart</NavLink>
        </li>
        <li>
            <NavLink to="/user/auth">Auth</NavLink>
        </li>
    </ul>
    )
};

export default NavLinks;