import type { MatchState, Territory } from "../MatchState.js";
import Transition from "./Transition";

/** Transition out of a state triggered by player interaction */
class TransitionGuarded extends Transition {
  constructor(expectedActionType, guard, reduce) {
    super(guard, reduce);
    this.expectedActionType = expectedActionType;
  }

  get action(): string {
    return this.expectedActionType;
  }

  /** @returns true or false */
  guard(action): boolean {
    return this.expectedActionType === action.type && super.guard(action);
  }
}

export default TransitionGuarded;
