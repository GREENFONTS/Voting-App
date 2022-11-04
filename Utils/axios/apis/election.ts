import { AxiosInstance } from "axios";
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
  
}

const ElectionService = new Election(api);

export default ElectionService;
