// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import { ACTIONS } from '../constants';
import TransitionGuarded from './TransitionGuarded';

/**
 * You may end trading as long as you hold four or fewer cards.
 */
export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionGuarded {
  const { cardOwner, currentPlayerIndex } = extendedState;

  const guard = () => cardOwner.filter(c => c === currentPlayerIndex).length < 5;

  const reduce = () => extendedState;

  return new TransitionGuarded(ACTIONS.END_TRADE, guard, reduce);
}
