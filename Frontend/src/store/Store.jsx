import { configureStore } from "@reduxjs/toolkit";
import userSlice from './reducers/UserSlice';
import cartSlice from "./reducers/CartSlice";
import productSlice from './reducers/ProductSlice';
export const store = configureStore({
    reducer: {
        useReducer: userSlice,
        productsReducer: productSlice,
        cartReducer: cartSlice
    },
})