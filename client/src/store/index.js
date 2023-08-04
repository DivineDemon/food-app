import { configureStore } from "@reduxjs/toolkit";

import itemReducer from "./slices/itemSlice";
import userReducer from "./slices/userSlice";
import categoryReducer from "./slices/categorySlice";

const store = configureStore({
  reducer: {
    item: itemReducer,
    user: userReducer,
    category: categoryReducer,
  },
});

export default store;
