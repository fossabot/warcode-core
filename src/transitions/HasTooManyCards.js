// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

/**
 * Player holds six or more cards, so must trade a set of three now.
 */
export default (
  matchConfig: MatchConfig,
  { cardOwner, territories, currentPlayerIndex }: MatchState
): TransitionType => ({
  guard: () =>
    cardOwner.filter(c => c === currentPlayerIndex).length > 5 &&
    territories.some(t => t.owner !== currentPlayerIndex), // hasn't won
  reduce: () => {},
});
