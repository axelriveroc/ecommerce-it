import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    cart: []

    
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    redurcers: {
        addToCart: () =>{}
    }
})

export const { addToCart } = cartSlice.actions

export default cartSlice.reducer