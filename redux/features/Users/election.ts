import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { dispatch, RootState } from "../../store";
import Position from "../../../models/election/positions";
import { ElectionState } from "../../../models/election/stateModel";
import { createResponse, setLoading } from "./auth";
import ElectionService from "../../../Utils/axios/apis/election";
import { ErrorHandler } from "../../../Utils/Error";

const initialState : ElectionState = {
  positions : []
};

export const addPosition = (data: Position) => async () => {
    dispatch(setLoading(true))
    try{
        await ElectionService.AddPosition(data)
        dispatch(GetPositions(data.user))
        dispatch(setLoading(false))
    }
    catch(err){
        console.log(err)
        dispatch(setLoading(false))
    }
}

export const GetPositions = (data: string) => async () => {
    dispatch(setLoading(true))
    try{
        const res = await ElectionService.GetPositions(data)
        dispatch(setPositions(res.data))
        dispatch(setLoading(false))
    }
    catch(err){
        dispatch(createResponse(ErrorHandler(err)))
        dispatch(setLoading(false))
    }
}


export const UpdatePosition = (data: Position) => async () => {
    dispatch(setLoading(true))
    try{
        await ElectionService.UpdatePosition(data)
        dispatch(GetPositions(data.user))
        dispatch(setLoading(false))
    }
    catch(err){
        dispatch(createResponse(ErrorHandler(err)))
        dispatch(setLoading(false))
    }
}

export const DeletePosition = (data: string) => async () => {
    dispatch(setLoading(true))
    try{
        const res = await ElectionService.DeletePosition(data)
        dispatch(GetPositions(res.data.user))
        dispatch(setLoading(false))
    }
    catch(err){
        dispatch(createResponse(ErrorHandler(err)))
        dispatch(setLoading(false))
    }
}

const ElectSlice = createSlice({
  name: "election",
  initialState,
  reducers: {
    setPositions : (state, action) => {
        state.positions = action.payload
    }
   
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

export const {setPositions } =
  ElectSlice.actions;

export const selectElectState = (state: RootState) => state.elect;

export default ElectSlice.reducer;
