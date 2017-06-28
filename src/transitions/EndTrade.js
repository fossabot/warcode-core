// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

/**
 * You may end trading as long as you hold four or fewer cards.
 */
export default function(
  matchConfig: MatchConfig,
  extendedState: MatchState,
  action: string
): TransitionType {
  const { cardOwner, currentPlayerIndex } = extendedState;

  return {
    action,
    guard: ({ type }) =>
      type === action && cardOwner.filter(c => c === currentPlayerIndex).length < 5,
    reduce: () => extendedState,
  };
}
