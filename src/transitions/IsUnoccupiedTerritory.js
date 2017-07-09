// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';

/**
 * There is one or more unoccupied territories on the game board
 */
export default function IsUnoccupiedTerritory(
  config: MatchConfig,
  { territories }: MatchState
): TransitionType {
  return {
    guard: () => territories.some(t => t.armies === 0),
    reduce: () => {},
  };
}
