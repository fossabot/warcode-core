// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  const { cardOwner, currentPlayerIndex } = extendedState;

  return {
    guard: () => cardOwner.every(o => o !== currentPlayerIndex),
    reduce: () => extendedState,
  };
}
