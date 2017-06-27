// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  return {
    guard: undefined,
    reduce: () => extendedState,
  };
}
