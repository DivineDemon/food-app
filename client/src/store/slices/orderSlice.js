import { createSlice } from "@reduxjs/toolkit";

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
      state.orderItems.push(action.payload);
      state.quantity += 1;
      state.total += action.payload.price;
    },
    getOrder: (state) => {
      return state.orderItems;
    },
    toggleDrawer: (state) => {
      state.isActive = !state.isActive;
    }
  },
});

export const { setOrder, getOrder, toggleDrawer } = orderSlice.actions;
export default orderSlice.reducer;
