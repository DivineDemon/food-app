import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { NextUIProvider } from "@nextui-org/react";
import { PersistGate } from "redux-persist/integration/react";

import "./index.css";
import App from "./App";
import Loading from "./components/Loading";
import { store, persistor } from "./store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <NextUIProvider>
        <App />
      </NextUIProvider>
    </PersistGate>
  </Provider>
);
