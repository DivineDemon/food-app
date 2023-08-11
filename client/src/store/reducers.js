import { combineReducers } from "@reduxjs/toolkit";

import itemReducer from "./slices/itemSlice";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";

const rootReducer = combineReducers({
  item: itemReducer,
  user: userReducer,
  category: categoryReducer,
});

export default rootReducer;
