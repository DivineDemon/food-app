import { createSlice } from "@reduxjs/toolkit";
import {
  incrementItemQuantity,
  decrementItemQuantity,
} from "../../utils/helpers";

const initialState = {
  total: 0,
  orderItems: [],
  quantity: 0,
  isActive: false,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      let item = action.payload;
      state.orderItems.push(item);
      state.quantity += 1;
      state.total += item.price;
    },
    getOrder: (state) => {
      return state.orderItems;
    },
    toggleDrawer: (state) => {
      state.isActive = !state.isActive;
    },
    deleteItem: (state, action) => {
      let filteredOrder = state.orderItems.filter(
        (item) => item.ID !== action.payload.ID
      );
      state.orderItems = filteredOrder;
      state.total -= action.payload.price;
      state.quantity = filteredOrder.length;
    },
    increment: (state, action) => {
      let finalItems = incrementItemQuantity(state.orderItems, action.payload);
      state.orderItems = finalItems;
    },
    decrement: (state, action) => {
      let finalItems = decrementItemQuantity(state.orderItems, action.payload);
      state.orderItems = finalItems;
    },
  },
});

export const {
  setOrder,
  getOrder,
  toggleDrawer,
  deleteItem,
  increment,
  decrement,
} = orderSlice.actions;
export default orderSlice.reducer;
