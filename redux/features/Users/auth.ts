import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { Auth, ResponseModel } from "../../../models/auth/stateModel";
import { LoginData } from "../../../models/auth/RequestModels";
import { dispatch, RootState } from "../../store";
import UserService from "../../../Utils/axios/apis/auth";
import { ErrorHandler } from "../../../Utils/Error";
import User from "../../../models/auth/User";
import { setNominees, setPositions } from "./election";

const initialState: Auth = {
  token: null,
  user: null,
  isLoading: false,
  response: {
    type: null,
    message: null,
    title: null,
  },
  authenticated: false,
};

export const UserLogin = (data: LoginData) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await UserService.Login(data);
    dispatch(AddUserData(res.data));
    dispatch(setLoading(false));
  } catch (err: any) {
    dispatch(createResponse(ErrorHandler(err)));
    dispatch(setLoading(false));
  }
};

export const UserGoogleLogin = (data: string) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await UserService.GoogleLogin(data);
    dispatch(AddUserData(res.data));
    dispatch(setLoading(false));
  } catch (err: any) {
    dispatch(setLoading(false));
    dispatch(createResponse(ErrorHandler(err)));
  }
};

export const UserRegister = (data: User) => async () => {
  try {
    const res = await UserService.CreateUser(data);
    dispatch(AddUserData(res.data));
    dispatch(setLoading(false));
  } catch (err: any) {
    dispatch(setLoading(false));
    dispatch(createResponse(ErrorHandler(err)));
  }
};

export const verifyToken = (token: string) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await UserService.VerifyToken(token);
    dispatch(
      setAuthenticated({
        state: true,
        data: res.data.user,
      })
    );
    dispatch(setPositions(res.data.positions))
    dispatch(setNominees(res.data.nominees))
    dispatch(setLoading(false));
  } catch (err) {
    localStorage.clear();
    dispatch(setAuthenticated({ state: false, data: null }));
    dispatch(setLoading(false));
    dispatch(createResponse(ErrorHandler(err)));
  }
};

const AuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    AddUserData: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.authenticated = true;
    },
    createResponse: (
      state,
      action: {
        type: string;
        payload: ResponseModel;
      }
    ) => {
      state.isLoading = false;
      state.response.message = action.payload.message;
      state.response.type = action.payload.type;
      state.response.title = action.payload.title;
    },
    reset: () => initialState,
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload.state;
      state.user = action.payload.data;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.auth,
      };
    },
  },
});

export const { setLoading, createResponse, setAuthenticated, AddUserData, reset } =
  AuthSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;

export default AuthSlice.reducer;
