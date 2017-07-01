// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

/**
 * You may end trading as long as you hold four or fewer cards.
 */
export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  const { cardOwner, currentPlayerIndex } = extendedState;

  return {
    guard: () => cardOwner.filter(c => c === currentPlayerIndex).length < 5,
    reduce: () => extendedState,
  };
}
