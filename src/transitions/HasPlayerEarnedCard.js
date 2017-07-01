// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

export default (
  matchConfig: MatchConfig,
  { cardOwner, capturedTerritories }: MatchState
): TransitionType => ({
  guard: () => capturedTerritories > 0 && cardOwner.some(owner => owner !== undefined),
  reduce: () => {},
});
