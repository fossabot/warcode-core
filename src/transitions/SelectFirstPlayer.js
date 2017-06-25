// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import { ACTIONS } from '../constants';
import TransitionGuarded from './TransitionGuarded';

/**
 * Select player to take first move, similarly to each player rolling
 * a die to determine the first player at the beginning the game.
 */
export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionGuarded {
  const { players } = extendedState;

  const guard = ({ firstPlayerIndex }) =>
    Number.isInteger(firstPlayerIndex) &&
    firstPlayerIndex >= 0 &&
    firstPlayerIndex < players.length;

  const reduce = ({ firstPlayerIndex }) => ({
    ...extendedState,
    currentPlayerIndex: firstPlayerIndex,
  });

  return new TransitionGuarded(ACTIONS.SELECT_FIRST_PLAYER, guard, reduce);
}
