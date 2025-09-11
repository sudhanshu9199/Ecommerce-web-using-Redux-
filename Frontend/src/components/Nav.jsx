import React from 'react'
import {NavLink} from 'react-router';
import style from '../styles/Nav.module.scss'
import { isAction } from '@reduxjs/toolkit';
const Nav = () => {
  return (
    <nav className={style}>
        <NavLink className={({isActive}) => (isActive ? style.active : '')} to='/'>Home</NavLink>
        <NavLink className={({isActive}) => (isActive ? style.active : '')} to='/products'>Products</NavLink>
        <NavLink className={({isActive}) => (isActive ? style.active : '')} to='/login'>Login</NavLink>
    </nav>
  )
}

export default Nav