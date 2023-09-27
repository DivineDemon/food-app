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

export const store = configureStore({
  reducer: rootReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userReducer"],
  blacklist: ["itemReducer", "categoryReducer", "orderReducer"],
};

export const persistedStore = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(persistedStore);