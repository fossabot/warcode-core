import type { MatchState, Territory } from "../MatchState.js";

/** Transition with guard or reduce, leaving a pseudostate */
class Transition {
  constructor(guard: GuardType, reduce: ReduceType) {
    this._guard = guard;
    this._reduce = reduce;
  }

  get action(): string {
    return undefined;
  }

  /** @returns true, false, or undefined when there is no guard */
  guard(action): ?boolean {
    return this._guard(action);
  }

  reduce(action) {
    if (typeof this._reduce === 'function') {
      return this._reduce(action);
    }
  }
}

export default Transition;
