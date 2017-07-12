// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';

/**
 * Player holds no cards, so skip trading.
 */
export default function HasNoCards(
  config: MatchConfig,
  { cardOwner, currentPlayer }: MatchState
): TransitionType {
  return {
    guard: () => cardOwner.every(o => o !== currentPlayer),
    reduce: () => {},
  };
}
