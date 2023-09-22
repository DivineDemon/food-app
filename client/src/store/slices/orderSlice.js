import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  orderItems: [],
  quantity: 0,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.orderItems.push(action.payload.item);
      state.quantity += 1;
      state.total += action.payload.item.price;
    },
    getOrder: (state) => {
      return state.orderItems;
    },
  },
});

export const { setOrder, getOrder } = orderSlice.actions;
export default orderSlice.reducer;
