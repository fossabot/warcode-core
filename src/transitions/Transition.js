// @flow
import type { MatchState } from '../MatchState';

/** Transition with guard or reduce, leaving a pseudostate */
class Transition {
  _guard: Guard;
  _reduce: Reduce;

  constructor(guard: Guard, reduce: Reduce) {
    this._guard = guard;
    this._reduce = reduce;
  }

  get action(): ?string {
    return undefined;
  }

  /** @returns true, false, or undefined when there is no guard */
  guard(action: actionInterface): ?boolean {
    return this._guard(action);
  }

  reduce(action: actionInterface): ?MatchState {
    if (typeof this._reduce === 'function') {
      return this._reduce(action);
    }
    return undefined;
  }
}

interface actionInterface {
  type: string
}

export type Guard = (action: Object) => ?boolean;
export type Reduce = (action: Object) => ?MatchState;
export default Transition;
