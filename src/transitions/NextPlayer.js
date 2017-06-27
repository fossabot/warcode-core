// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
import nextPlayerIndex from './nextPlayerIndex';

export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  return {
    guard: undefined,
    reduce: () => ({
      ...extendedState,
      currentPlayerIndex: nextPlayerIndex(extendedState),
    }),
  };
}
