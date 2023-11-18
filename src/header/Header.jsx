import React, { useState, useRef, useEffect } from 'react'
import './Header.css'
import icon from '../img/pokemon-icon.png'
import { Link, NavLink } from 'react-router-dom'
import { LuHome } from "react-icons/lu";
import { GiShoppingBag } from "react-icons/gi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FaShoppingCart } from "react-icons/fa";
import { Outlet } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
const Header = ({ cart }) => {

    let activeClassName = "nav-active"

    const [active, setActive] = useState(false)

    const menuRef = useRef(null)

    useEffect(() => {
        const handleClickoutside = (event) => {
            if (!menuRef.current.contains(event.target)) {
                setActive(false)

            }

        }
        document.addEventListener('mousedown', handleClickoutside)
        return () => {
            document.removeEventListener('mousedown', handleClickoutside);
        };
    }, [])

    return (
        <>
            <div className='header-container'>
                <Link to='/' className='icon-header'>
                    <img src={icon} alt="" width={150} />
                </Link>
                <ul className={` ${active ? 'activeLink' : ""}`} ref={menuRef}>
                    <li><NavLink to='/' className={({ isActive }) => isActive ? activeClassName : undefined} > <span><LuHome /></span>Home</NavLink></li>
                    <li><NavLink to='/store/list' className={({ isActive }) => isActive ? activeClassName : undefined}><span><GiShoppingBag /></span>SHOP</NavLink></li>
                    <li><NavLink to='/store/cart' className={({ isActive }) => isActive ? activeClassName : undefined}><span><HiOutlineShoppingCart /></span>CART</NavLink></li>
                </ul>
                <div className="wrap">
                    <Link to='/store/cart' className='cart-header'>
                        <FaShoppingCart /> <span>{cart.length}</span>
                    </Link>
                    <button className={`menu-bar `} onClick={() => { setActive(!active) }}   >
                        <IoMenu />
                    </button>
                </div>
            </div>
            <Outlet />
        </>
    )
}

export default Header