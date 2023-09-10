import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { dispatch, RootState } from "../../store";
import {
  ElectionState,
  VotingState,
} from "../../../models/election/stateModel";
import { createResponse, setLoading } from "./auth";
import { ErrorHandler } from "../../../Utils/Error";
import VotingService from "../../../Utils/axios/apis/voting";
import Position from "../../../models/election/positions";

const initialState: VotingState = {
  positions : [] ,
  nominees: [],
  electionStatus: false,
  user: null,
  token : null,
  authenticated: false,
  filteredNominees : []
};

export const GetVotingData = (data: string) => async () => {
  dispatch(setLoading(true));
  
};

export const VerifyCode = (code: string, user: string) => async () => {
    dispatch(setLoading(true));
    try {
      const res = await VotingService.VerifyCode(code, user);
      dispatch(setAuthenticated(res.data))
  
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(createResponse(ErrorHandler(err)));
      dispatch(setLoading(false));
    }
  };

  export const VerifyToken = (token: string) => async () => {
    dispatch(setLoading(true));
    try {
      const res = await VotingService.VerifyToken(token);
      dispatch(setAuthenticated(res.data))
  
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(createResponse(ErrorHandler(err)));
      dispatch(setLoading(false));
    }
  };

  export const VoteNominee = (id: string, votes: string) => async () => {
    dispatch(setLoading(true));
    try {
      await VotingService.VoteNominee(id, votes);  
      dispatch(setLoading(false));
    } catch (err) {
      dispatch(createResponse(ErrorHandler(err)));
      dispatch(setLoading(false));
    }
  };

const VoteSlice = createSlice({
  name: "voting",
  initialState,
  reducers: {
    setElectionUser: (state, action) => {
      state.user = action.payload;
    },
    setVotingPositions: (state, action) => {
      state.positions = action.payload;
    },
    setVotingNominees: (state, action) => {
      state.nominees = action.payload;
    },
    setElectionStatus: (state, action) => {
      state.electionStatus = action.payload;
    },
    setAuthenticated : (state, action) => {
        state.authenticated = true,
        state.token = action.payload
    },
    setFilteredNominees : (state, action) => {
        state.filteredNominees = action.payload
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

export const { setVotingPositions, setVotingNominees, setElectionUser, setElectionStatus, setAuthenticated, setFilteredNominees } =
  VoteSlice.actions;

export const selectVoteState = (state: RootState) => state.vote;

export default VoteSlice.reducer;
