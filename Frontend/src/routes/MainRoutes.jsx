import React from 'react'
import { Routes, Route } from 'react-router';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Products from '../pages/products';
import Register from '../pages/Register';
const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
    </Routes>
  )
}

export default MainRoutes