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
import { CreateCodesData } from "../../../models/election/Codes";
import { setVotingNominees, setVotingPositions } from "./voting";

const initialState: ElectionState = {
  positions: [],
  nominees: [],
  codes: [],
  electionStatus: false,
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
    if(res.data){
      dispatch(setPositions(res.data));
      dispatch(setVotingPositions(res.data))
      dispatch(setLoading(false));
    }
 
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
    dispatch(
      createResponse({
        type: ErrorTypes.Success,
        title: "Success",
        message: "Position was deleted successfully",
      })
    );
  } catch (err) {
    dispatch(createResponse(ErrorHandler(err)));
    dispatch(setLoading(false));
  }
};

export const GetNominees = (data: string) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await ElectionService.GetNominees(data);
    if(res.data){
      dispatch(setNominees(res.data));
      dispatch(setVotingNominees(res.data))
      dispatch(setLoading(false));
    }   
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
    dispatch(
      createResponse({
        type: ErrorTypes.Success,
        title: "Success",
        message: "Nominee was deleted successfully",
      })
    );
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
    dispatch(
      createResponse({
        type: ErrorTypes.Success,
        title: "Success",
        message: "Nominees deleted successfully",
      })
    );
  } catch (err) {
    dispatch(createResponse(ErrorHandler(err)));
    dispatch(setLoading(false));
  }
};

export const GenerateCodes = (data: CreateCodesData) => async () => {
  dispatch(setLoading(true));
  try {
    await ElectionService.GenerateCodes(data);
    dispatch(GetCodes({ user: data.user }));
    dispatch(
      createResponse({
        type: ErrorTypes.Success,
        title: "Success",
        message: "Codes generated successfully",
      })
    );
  } catch (err) {
    dispatch(createResponse(ErrorHandler(err)));
    dispatch(setLoading(false));
  }
};

export const GetCodes = (data: { user: string }) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await ElectionService.GetCodes(data);
    dispatch(setCodes(res.data));
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(createResponse(ErrorHandler(err)));
    dispatch(setLoading(false));
  }
};

export const GetElectionStatus = (data: { user: string }) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await ElectionService.GetElectionState(data);
    dispatch(setElectionStatus(res.data));
    dispatch(setLoading(false));
  } catch (err) {
    dispatch(createResponse(ErrorHandler(err)));
    dispatch(setLoading(false));
  }
};

export const UpdateElectionStatus = (data: { user: string }) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await ElectionService.UpdateElectionState(data);
    dispatch(GetElectionStatus(data));
    dispatch(setLoading(false));
    dispatch(
      createResponse({
        type: ErrorTypes.Success,
        title: "Success",
        message: `Election Link has been ${!res.data ? "enabled" : "disabled"} `,
      })
    );
  } catch (err) {
    dispatch(createResponse(ErrorHandler(err)));
    dispatch(setLoading(false));
  }
};

export const ResetVotes = (data: { user: string }) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await ElectionService.ResetVotes(data);
    dispatch(setLoading(false));
    dispatch(
      createResponse({
        type: ErrorTypes.Success,
        title: "Success",
        message: `Votes has been reset`,
      })
    );
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
    setCodes: (state, action) => {
      state.codes = action.payload;
    },
    setElectionStatus: (state, action) => {
      state.electionStatus = action.payload;
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

export const { setPositions, setNominees, setCodes, setElectionStatus } =
  ElectSlice.actions;

export const selectElectState = (state: RootState) => state.elect;

export default ElectSlice.reducer;
