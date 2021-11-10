import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer, { USER_FEATURE_KEY } from "./user.slice";
import logger from "redux-logger";

export default configureStore({
  reducer: {
    [USER_FEATURE_KEY]: userReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: [...getDefaultMiddleware(), logger]
})
