import { AxiosInstance } from "axios";
import { CreateCodesData } from "../../../models/election/Codes";
import { UpdateNomineeData } from "../../../models/election/Nominee";
import Position from "../../../models/election/positions";

import api from "../axios";

class Voting {
  constructor(private readonly request: AxiosInstance) {}

  async GetUser(data: string) {
    return this.request.get(`/voting/?id=${data}`);
  }

  async VerifyCode(code: string, email: string) {
    return this.request.get(`/voting/code/?code=${code}&user=${email}`);
  }

  async VerifyToken(token: string) {
    return this.request.get(`/voting/auth/?token=${token}`);
  }

  async VoteNominee(id: string, votes: string) {
    return this.request.get(`/voting/updateNominee/?id=${id}&&votes=${votes}`);
  }
  
}

const VotingService = new Voting(api);

export default VotingService;
