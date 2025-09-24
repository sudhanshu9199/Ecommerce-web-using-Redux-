import { Routes, Route } from "react-router";
import {lazy} from "react";

const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Products = lazy(() => import('../pages/products'));
const Register = lazy(() => import('../pages/Register'));
const CreateProduct = lazy(() => import('../pages/product/CreateProduct'));
const ProductDetail = lazy(() => import('../pages/product/ProductDetail'));
const UpdateProduct = lazy(() => import('../pages/product/UpdateProduct'));
const UserProfile = lazy(() => import('../pages/user/UserProfile'));
const Cart = lazy(() => import('../pages/Cart'));
const AuthWrapper = lazy(() => import('./AuthWrapper'));

const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route
        path="/create-product"
        element={
          <AuthWrapper>
            <CreateProduct />
          </AuthWrapper>
        }
      />
      <Route path="/update-product/:id" element={<UpdateProduct />} />
      <Route
        path="/user-profile"
        element={
          <AuthWrapper>
            <UserProfile />
          </AuthWrapper>
        }
      />
      <Route
        path="/cart"
        element={
          <AuthWrapper>
            <Cart />
          </AuthWrapper>
        }
      />
    </Routes>
  );
};

export default MainRoutes;
