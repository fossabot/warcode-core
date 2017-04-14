// @flow
import Transition from './Transition';
import type { Guard, Reduce } from './Transition';

/** Transition out of a state triggered by player interaction */
class TransitionGuarded extends Transition {
  expectedActionType: string;

  constructor(expectedActionType: string, guard: Guard, reduce: Reduce) {
    super(guard, reduce);
    this.expectedActionType = expectedActionType;
  }

  get action(): string {
    return this.expectedActionType;
  }

  /** @returns true or false */
  guard(action: actionInterface): boolean {
    return this.expectedActionType === action.type && !!super.guard(action);
  }
}

interface actionInterface {
  type: string,
}
export default TransitionGuarded;
