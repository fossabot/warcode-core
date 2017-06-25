// @flow
import type { MatchState } from '../MatchState';

/** Transition with guard or reduce, leaving a pseudostate */
class Transition {
  guardAttribute: Guard;
  reduceAttribute: Reduce;

  constructor(guard: Guard, reduce: Reduce) {
    this.guardAttribute = guard;
    this.reduceAttribute = reduce;
  }

  get action(): ?string {
    return undefined;
  }

  /** @returns true, false, or undefined when there is no guard */
  guard(action: actionInterface): ?boolean {
    return this.guardAttribute(action);
  }

  reduce(action: actionInterface): ?MatchState {
    if (typeof this.reduceAttribute === 'function') {
      return this.reduceAttribute(action);
    }
    return undefined;
  }
}

interface actionInterface {
  type: string,
}

export type Guard = (action: Object) => ?boolean;
export type Reduce = (action: Object) => ?MatchState;
export default Transition;
