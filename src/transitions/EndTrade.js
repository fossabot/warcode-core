// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';

export default (
  config: MatchConfig,
  { cardOwner, currentPlayerIndex }: MatchState
): TransitionType => ({
  guard: () => cardOwner.filter(c => c === currentPlayerIndex).length < 5,
  reduce: () => {},
});
