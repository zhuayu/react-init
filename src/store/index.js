import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer, { USER_FEATURE_KEY } from "./user.slice";
import modalReducer, { MODAL_FEATURE_KEY } from "./modal.slice";
import logger from "redux-logger";

const config = {
  reducer: {
    [USER_FEATURE_KEY]: userReducer,
    [MODAL_FEATURE_KEY]: modalReducer,
  },
  devTools: process.env.NODE_ENV === "development",
  middleware: [...getDefaultMiddleware()]
};

if(process.env.NODE_ENV === "development") {
  config.middleware.push(logger)
}

export default configureStore(config);
