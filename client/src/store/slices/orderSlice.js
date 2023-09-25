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
  },
});

export const { setOrder, getOrder, toggleDrawer, deleteItem } =
  orderSlice.actions;
export default orderSlice.reducer;
