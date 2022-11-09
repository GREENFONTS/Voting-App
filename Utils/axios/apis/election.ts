import { AxiosInstance } from "axios";
import { CreateCodesData } from "../../../models/election/Codes";
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

  async GenerateCodes(data: CreateCodesData) {
    return this.request.post(`/admin/codes/generate`, data);
  }

  async GetCodes(data: {user: string}) {
    return this.request.post(`/admin/codes/find`, data);
  }

  async GetElectionState(data: {user: string}) {
    return this.request.post(`/voting/state`, data);
  }

  async UpdateElectionState(data: {user: string}) {
    return this.request.post(`/voting/updateState`, data);
  }

  async ResetVotes(data: {user: string}) {
    return this.request.post(`/voting/resetVotes`, data);
  }
  
}

const ElectionService = new Election(api);

export default ElectionService;
