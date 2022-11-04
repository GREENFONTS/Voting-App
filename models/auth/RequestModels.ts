 
  export type UpdateData = {
    firstName: string;
    lastName: string;
    userName: string;
  }
  
  
  
  export interface LoginData {
    email: string;
    password: string;
  }
  
  export interface ChangePasswordData {
    userId: string;
    oldPassword: string;
    newPassword: string;
  }
  
  export interface ResetPasswordData {
    email?: string | undefined;
    oldPassword: string;
    newPassword: string;
  }