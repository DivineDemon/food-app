import { configureStore } from "@reduxjs/toolkit";

import itemReducer from "./slices/itemSlice";
import categoryReducer from "./slices/categorySlice";

const store = configureStore({
  reducer: {
    item: itemReducer,
    category: categoryReducer,
  },
});

export default store;
