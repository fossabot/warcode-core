// @flow
import type { MatchState } from '../MatchState';

export type TransitionType = {
  action?: string,
  guard?: (action: Object) => boolean, // TODO - replace Object with flow types for each action
  reduce?: (action: Object) => MatchState,
};
