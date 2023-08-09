import React from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css"
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../reducers/userReducer'

const NavLinks = props => {
    const isAuth = useSelector(state => state.user.isAuth)
    const dispatch = useDispatch()

    return (
    <ul className="nav-links">
        <li>
            <NavLink to="/catalog">Catalog</NavLink>
        </li>
        <li>
            <NavLink to="/user/list">Me</NavLink>
        </li>
        {!isAuth &&<li>
            <NavLink to="/user/cart">Cart</NavLink>
        </li> }
        {!isAuth && <li>
            <NavLink to="/user/login">Login</NavLink>
        </li>}
        {isAuth && <li>
            <NavLink to='/user/logout' onClick={()=> dispatch(logout())}>logout</NavLink>
        </li>}
    </ul>
    )
};

export default NavLinks;