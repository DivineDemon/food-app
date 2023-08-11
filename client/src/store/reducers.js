import { combineReducers } from "@reduxjs/toolkit";

import itemReducer from "./slices/itemSlice";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";

const rootReducer = combineReducers({
  itemReducer,
  userReducer,
  categoryReducer,
});

export default rootReducer;
