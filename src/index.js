import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/global.css";
import "./styles/reset.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./modules/index";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

const root = ReactDOM.createRoot(document.getElementById("root"));
const persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
