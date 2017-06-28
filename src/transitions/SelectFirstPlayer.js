// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

/**
 * Select player to take first move, similarly to each player rolling
 * a die to determine the first player at the beginning the game.
 */
export default function(
  matchConfig: MatchConfig,
  extendedState: MatchState,
  action: string
): TransitionType {
  const { players } = extendedState;

  return {
    action,
    guard: ({ type, firstPlayerIndex }) =>
      type === action &&
      Number.isInteger(firstPlayerIndex) &&
      firstPlayerIndex >= 0 &&
      firstPlayerIndex < players.length,
    reduce: ({ firstPlayerIndex }) => ({
      ...extendedState,
      currentPlayerIndex: firstPlayerIndex,
    }),
  };
}
