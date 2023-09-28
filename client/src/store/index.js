import rootReducer from "./reducers";
import storage from "redux-persist/lib/storage";
import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PURGE,
  PERSIST,
  REGISTER,
  REHYDRATE,
  persistStore,
  persistReducer,
} from "redux-persist";
import apiReducer from "./slices/apiSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"],
  blacklist: ["api", "item", "category", "order"],
};

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(apiReducer.middleware),
});

export const persistor = persistStore(store);