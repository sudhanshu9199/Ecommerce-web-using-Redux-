import React from "react";
import { NavLink, useNavigate } from "react-router";
import style from "../styles/Nav.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { asyncLogoutUser } from "../store/actions/UserActions";
const Nav = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const user = useSelector((state) => state.userReducer.users);

  const LogoutHandler = () => {
    dispatch(asyncLogoutUser());
    navigator('/')
  }
  return (
    <nav className={style}>
      <NavLink
        className={({ isActive }) => (isActive ? style.active : "")}
        to="/"
      >
        Home
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? style.active : "")}
        to="/products"
      >
        Products
      </NavLink>

      {user ? (
        <>
          {user && user.isAdmin && <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to="/create-product"
          >
            Create product
          </NavLink>}
          <NavLink className={({ isActive }) => (isActive ? style.active : "")} to='/user-profile'>Profile</NavLink>
          <button onClick={LogoutHandler}>Logout</button>
        </>
      ) : (
        <>
          <NavLink
            className={({ isActive }) => (isActive ? style.active : "")}
            to="/login"
          >
            Login
          </NavLink>
        </>
      )}
    </nav>
  );
};

export default Nav;
