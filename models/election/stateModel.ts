import Nominee from "./Nominee";
import Position from "./positions";

export interface ElectionState{
    positions : Position[];
    nominees : Nominee[]
}