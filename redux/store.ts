import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./features/Users/auth";
import UtilReducer from "./features/Utils/utils";
import ElectReducer from "./features/Users/election";
import VoteReducer from "./features/Users/voting"

const reducers = combineReducers({
  auth: authReducer,
  util: UtilReducer,
  elect: ElectReducer,
  vote : VoteReducer
});

const store = configureStore({
  reducer: reducers,
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const dispatch = store.dispatch;

export default store;
