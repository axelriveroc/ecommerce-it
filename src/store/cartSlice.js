import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      let exist = state.cart.some((p) => p.id === action.payload.id);
      if (exist) {
        let newArr = state.cart.map((p) => {
          if (p.id === action.payload.id) {
            return {
              ...p,
              quantity: /* p.quantity + */ action.payload.quantity,
            };
          } else {
            return p;
          }
        });
        state.cart = newArr;
        localStorage.setItem("cart", JSON.stringify(newArr));
      } else {
        state.cart = [...state.cart, action.payload];
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("cart");
    },
    removeById: (state, action) => {
      let newArr = state.cart.filter((p) => p.id !== action.payload);
      if (state.cart.length === 1) {
        state.cart = [];
        localStorage.removeItem("cart");
      } else {
        localStorage.setItem("cart", JSON.stringify(newArr));
        state.cart = newArr;
      }
    },
    getTotalPrice: (state) => {
      const totalPrice = state.cart.reduce((acc, e) => {
        return acc + e.price * e.quantity;
      }, 0);
      state.total = totalPrice;
    },
    incrementQ: (state, action) => {
      let newArr = state.cart.map((prod) => {
        if (prod.id === action.payload) {
          return {
            ...prod,
            quantity: prod.quantity + 1,
          };
        } else {
          return prod;
        }
      });
      localStorage.setItem("cart", JSON.stringify(newArr));
      state.cart = newArr;
    },
    decrementQ: (state, action) => {
      let newArr = state.cart.map((prod) => {
        if (prod.id === action.payload) {
          return {
            ...prod,
            quantity: prod.quantity - 1,
          };
        } else {
          return prod;
        }
      });
      localStorage.setItem("cart", JSON.stringify(newArr));
      state.cart = newArr;
    },
  },
});

export const {
  addToCart,
  clearCart,
  removeById,
  getTotalPrice,
  incrementQ,
  decrementQ,
} = cartSlice.actions;

export default cartSlice.reducer;
