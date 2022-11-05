import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { dispatch, RootState } from "../../store";
import Position from "../../../models/election/positions";
import { ElectionState } from "../../../models/election/stateModel";
import { createResponse, setLoading } from "./auth";
import ElectionService from "../../../Utils/axios/apis/election";
import { ErrorHandler } from "../../../Utils/Error";
import { ErrorTypes } from "../../../models/auth/stateModel";
import { UpdateNomineeData } from "../../../models/election/Nominee";

const initialState: ElectionState = {
  positions: [],
  nominees : []
};

export const addPosition = (data: Position) => async () => {
  dispatch(setLoading(true));
  try {
    await ElectionService.AddPosition(data);
    dispatch(GetPositions(data.user));
    dispatch(setLoading(false));
    dispatch(
      createResponse({
        type: ErrorTypes.Success,
        title: "Success",
        message: "Position was added successfully",
      })
    );
  } catch (err) {
    dispatch(setLoading(false));
    dispatch(createResponse(ErrorHandler(err)));
  }
};

export const GetPositions = (data: string) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await ElectionService.GetPositions(data);
    dispatch(setPositions(res.data));
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(createResponse(ErrorHandler(err)));
    dispatch(setLoading(false));
  }
};

export const UpdatePosition = (data: Position) => async () => {
  dispatch(setLoading(true));
  try {
    await ElectionService.UpdatePosition(data);
    dispatch(GetPositions(data.user));
    dispatch(
      createResponse({
        type: ErrorTypes.Success,
        title: "Success",
        message: "Position was updated successfully",
      })
    );
  } catch (err) {
    dispatch(createResponse(ErrorHandler(err)));
    dispatch(setLoading(false));
  }
};

export const DeletePosition = (data: string) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await ElectionService.DeletePosition(data);
    dispatch(GetPositions(res.data.user));
    dispatch(createResponse({
      type: ErrorTypes.Success,
      title: "Success",
      message: "Position was deleted successfully",
    }));
  } catch (err) {
    dispatch(createResponse(ErrorHandler(err)));
    dispatch(setLoading(false));
  }
};

export const GetNominees = (data: string) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await ElectionService.GetNominees(data);
    dispatch(setNominees(res.data));
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(createResponse(ErrorHandler(err)));
    dispatch(setLoading(false));
  }
};

export const UpdateNominee = (data: UpdateNomineeData) => async () => {
  dispatch(setLoading(true));
  try {
    await ElectionService.UpdateNominee(data);
    dispatch(GetNominees(data.user));
    dispatch(
      createResponse({
        type: ErrorTypes.Success,
        title: "Success",
        message: "Nominee was updated successfully",
      })
    );
  } catch (err) {
    dispatch(createResponse(ErrorHandler(err)));
    dispatch(setLoading(false));
  }
};

export const DeleteNominee = (data: string) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await ElectionService.DeleteNominee(data);
    dispatch(GetNominees(res.data.user));
    dispatch(createResponse({
      type: ErrorTypes.Success,
      title: "Success",
      message: "Nominee was deleted successfully",
    }));
  } catch (err) {
    dispatch(createResponse(ErrorHandler(err)));
    dispatch(setLoading(false));
  }
};

export const ClearAllNominees = (data: string) => async () => {
  dispatch(setLoading(true));
  try {
    await ElectionService.ClearAllNominees(data);
    dispatch(GetNominees(data));
    dispatch(createResponse({
      type: ErrorTypes.Success,
      title: "Success",
      message: "Nominees deleted successfully",
    }));
  } catch (err) {
    dispatch(createResponse(ErrorHandler(err)));
    dispatch(setLoading(false));
  }
};

const ElectSlice = createSlice({
  name: "election",
  initialState,
  reducers: {
    setPositions: (state, action) => {
      state.positions = action.payload;
    },
    setNominees: (state, action) => {
      state.nominees = action.payload;
    }, 
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.election,
      };
    },
  },
});

export const { setPositions, setNominees } = ElectSlice.actions;

export const selectElectState = (state: RootState) => state.elect;

export default ElectSlice.reducer;
