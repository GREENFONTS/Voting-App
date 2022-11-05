import { ErrorTypes, ResponseModel } from "../models/auth/stateModel";

export const ErrorHandler = (err: any): ResponseModel => {
  if (err.code === "ERR_NETWORK") {
    return {
      type: ErrorTypes.Error,
      title: "Error",
      message: "You are offline",
    };
  }
  if (err.code === "ERR_BAD_REQUEST") {
    if (err.response.data) {
      console.log(err.response.data.msg);
      return {
        type: ErrorTypes.Error,
        title: "Error",
        message: err.response.data.msg,
      };
    
    } else {
      return {
        type: ErrorTypes.Error,
        title: "Error",
        message: "Something went wrong",
      };
    }
  }
  return {
    type: ErrorTypes.Error,
    title: "Error",
    message: "Something went wrong",
  };
};
