// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  const { cardOwner, capturedTerritories } = extendedState;
  return {
    guard: () => capturedTerritories > 0 && cardOwner.some(owner => owner !== undefined),
    reduce: () => extendedState,
  };
}
