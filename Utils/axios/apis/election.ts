import { AxiosInstance } from "axios";
import { UpdateNomineeData } from "../../../models/election/Nominee";
import Position from "../../../models/election/positions";

import api from "../axios";

class Election  {
  constructor(private readonly request: AxiosInstance) {}

  async AddPosition(data: Position) {
    return this.request.post("/admin/positions/add", data);
  }

  async GetPositions(data: string) {
    return this.request.get(`/admin/positions/find?user=${data}`);
  }

  async UpdatePosition(data: Position) {
    return this.request.post(`/admin/positions/update?id=${data.id}`, data);
  }

  async DeletePosition(data: string) {
    return this.request.get(`/admin/positions/delete?id=${data}`);
  }

  async GetNominees(data: string) {
    return this.request.get(`/admin/nominees/find?user=${data}`);
  }

  async UpdateNominee(data: UpdateNomineeData) {
    return this.request.post(`/admin/nominees/update?id=${data.id}`, data);
  }

  async DeleteNominee(data: string) {
    return this.request.get(`/admin/nominees/delete?id=${data}`);
  }

  async ClearAllNominees(data: string) {
    return this.request.get(`/admin/nominees/deleteAll?user=${data}`);
  }
  
}

const ElectionService = new Election(api);

export default ElectionService;
