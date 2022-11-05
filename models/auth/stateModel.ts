export interface Auth {
    token: string | null;
    user: UserResponseModel | null;
    isLoading: boolean;
    response: ResponseModel
    authenticated: boolean;
  }
  
  export enum ErrorTypes{
    Error  = "error",
    Success = "success"
  }
  
  export interface ResponseModel{
    type: ErrorTypes | null,
    message: string | null,
    title : string | null,
  }
  
  export interface UserResponseModel {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: string;
  }
  
 