import { configureStore } from "@reduxjs/toolkit";
import { applyMiddleware } from "redux";
import rootReducer from "../reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const store = configureStore({ reducer: rootReducer }, composeWithDevTools(applyMiddleware(thunk)));

export default store;
