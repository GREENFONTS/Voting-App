import { AxiosInstance } from "axios";
import {
  LoginData,
  UpdateData,
} from "../../../models/auth/RequestModels";
import UserModel from "../../../models/auth/User";

import api from "../axios";

class User {
  constructor(private readonly request: AxiosInstance) {}

  async CreateUser(data: UserModel) {
    return this.request.post("/register", data);
  }

  async UpdateUser(Id: string, data: UpdateData) {
    return this.request.post(`/user/${Id}`, data);
  }

  async Login(data: LoginData) {
    return this.request.post("/login", data);
  }

  async GoogleLogin(email: string) {
    return this.request.get(`/googleSignIn?email=${email}`);
  }

  async VerifyToken(token: string) {
    return this.request.get(`/admin/?token=${token}`);
  }
}

const UserService = new User(api);

export default UserService;
