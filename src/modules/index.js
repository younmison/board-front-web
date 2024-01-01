import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import user from "./user";
import board from "./board";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ board, user });

const persistConfig = {
  key: "root",
  storage,
};

const persistor = persistReducer(persistConfig, rootReducer);

const store = createStore(persistor, applyMiddleware(thunk));

export default store;
