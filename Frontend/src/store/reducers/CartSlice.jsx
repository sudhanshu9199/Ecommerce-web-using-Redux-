import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        loadCart: (state, action) => {
            state.cart = action.payload;
        },
        addToCart: (state, action) => {
            const product = action.payload;
            const existingIndex = state.cart.findIndex(item => item.product.id === product.id);

            if (existingIndex === -1) state.cart.push({ product, quantity: 1 });
            else state.cart[existingIndex].quantity += 1;
        }
    },
})

export default cartSlice.reducer;
export const { loadCart, addToCart } = cartSlice.actions;