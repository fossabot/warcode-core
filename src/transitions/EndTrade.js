// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';

export default (config: MatchConfig, { cardOwner, currentPlayer }: MatchState): TransitionType => ({
  guard: () => cardOwner.filter(c => c === currentPlayer).length < 5,
  reduce: () => {},
});
