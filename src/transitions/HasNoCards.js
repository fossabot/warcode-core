// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

export default (
  matchConfig: MatchConfig,
  { cardOwner, currentPlayerIndex }: MatchState
): TransitionType => ({
  guard: () => cardOwner.every(o => o !== currentPlayerIndex),
  reduce: () => {},
});
