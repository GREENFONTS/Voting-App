import Code from "./Codes";
import Nominee from "./Nominee";
import Position from "./positions";

export interface ElectionState {
  positions: Position[];
  nominees: Nominee[];
  codes: Code[];
  electionStatus: Boolean;
}

export interface VotingState {
  positions: string[];
  nominees: Nominee[];
  electionStatus: Boolean;
  user: string | null;
  token: string | null;
  authenticated: boolean;
  filteredNominees: Nominee[]
}
