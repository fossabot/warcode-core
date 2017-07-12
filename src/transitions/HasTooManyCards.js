// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';

/**
 * Player holds six or more cards, so must trade a set of three now.
 */
export default function HasTooManyCards(
  config: MatchConfig,
  { cardOwner, territories, currentPlayer }: MatchState
): TransitionType {
  return {
    guard: () =>
      cardOwner.filter(c => c === currentPlayer).length > 5 &&
      territories.some(t => t.owner !== currentPlayer), // hasn't won
    reduce: () => {},
  };
}
