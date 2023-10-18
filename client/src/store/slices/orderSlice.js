import { createSlice } from "@reduxjs/toolkit";
import {
  incrementItemQuantity,
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
      let foundItem = 0;
      let item = action.payload;

      if (state.orderItems.length !== 0) {
        foundItem = state.orderItems.findIndex(
          (orderItem) => orderItem.ID === item.ID
        );
        if (foundItem === -1) {
          state.orderItems.push(item);
          state.quantity += 1;
          state.total += item.price;
        } else {
          let finalItems = incrementItemQuantity(state.orderItems, item.ID);
          state.orderItems = finalItems;
          state.total += item.price;
        }
      } else {
        state.orderItems.push(item);
        state.quantity += 1;
        state.total += item.price;
      }
    },
    getOrder: (state) => {
      return state.orderItems;
    },
    toggleDrawer: (state) => {
      state.isActive = !state.isActive;
    },
    deleteItem: (state, action) => {
      let removedItem = state.orderItems.filter(
        (item) => item.ID === action.payload.ID
      );

      removedItem = removedItem[0];
      let cutPrice = removedItem.price * removedItem.quantity;
      state.total -= cutPrice;

      let filteredOrder = state.orderItems.filter(
        (item) => item.ID !== action.payload.ID
      );

      state.orderItems = filteredOrder;
      state.quantity = filteredOrder.length;
    },
    increment: (state, action) => {
      let finalItems = incrementItemQuantity(
        state.orderItems,
        action.payload.ID
      );
      state.orderItems = finalItems;
      state.total += action.payload.price;
    },
    decrement: (state, action) => {
      const index = state.orderItems.findIndex((item) => item.ID === action.payload.ID);

      if (index !== -1) {
        if (state.orderItems[index].quantity !== 1) {
          state.orderItems[index].quantity -= 1;
          state.total -= action.payload.price;
        }
      }
    },
    clearOrders: (state) => {
      state.total = 0;
      state.orderItems = [];
      state.quantity = 0;
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
  clearOrders,
} = orderSlice.actions;
export default orderSlice.reducer;
