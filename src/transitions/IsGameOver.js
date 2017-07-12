// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';

/**
 * The game ends when the current player owns every territory.
 */
export default function IsGameOver(
  config: MatchConfig,
  { territories, currentPlayer }: MatchState
): TransitionType {
  return {
    guard: () => territories.every(t => t.owner === currentPlayer),
    reduce: () => {},
  };
}
