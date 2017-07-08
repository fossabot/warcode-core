// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';

/**
 * Player has conquored one or more territories this turn.
 */
export default function HasDefeatedTerritory(
  config: MatchConfig,
  { territories, activeBattle }: MatchState
): TransitionType {
  return {
    guard: () => !!activeBattle && territories[activeBattle.defendingTerritoryIndex].armies === 0,
    reduce: () => {},
  };
}
