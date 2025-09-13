import React from 'react'
import { Routes, Route } from 'react-router';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Products from '../pages/products';
import Register from '../pages/Register';
import CreateProduct from '../pages/product/CreateProduct';
import ProductDetail from '../pages/product/ProductDetail';
const MainRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/products' element={<Products />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
        <Route path='/product/:id' element={<ProductDetail />}/>
        <Route path='/create-product' element={<CreateProduct />}/>
    </Routes>
  )
}

export default MainRoutes