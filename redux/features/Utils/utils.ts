import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UtilsModel } from "../../../models/utils";
import { RootState } from "../../store";

const initialState : UtilsModel = {
  drawerState: false,
};

const UtilSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    setDrawerState: (state, action : PayloadAction<boolean>) => {
      state.drawerState = action.payload;
    },
    reset: () => initialState,
  },
});

export const { setDrawerState, reset } = UtilSlice.actions;

export const selectUtilState = (state: RootState) => state.util;

export default UtilSlice.reducer;
