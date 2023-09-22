import { combineReducers } from "@reduxjs/toolkit";

import itemReducer from "./slices/itemSlice";
import userReducer from "./slices/userSlice";
import orderReducer from "./slices/orderSlice";
import categoryReducer from "./slices/categorySlice";

const rootReducer = combineReducers({
  item: itemReducer,
  user: userReducer,
  order: orderReducer,
  category: categoryReducer,
});

export default rootReducer;
