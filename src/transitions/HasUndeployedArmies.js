// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';

/**
 * Player has one or more armies to deploy
 */
export default function HasUndeployedArmies(
  config: MatchConfig,
  { players, currentPlayerIndex }: MatchState
): TransitionType {
  return {
    guard: () => players[currentPlayerIndex].undeployedArmies >= 1,
    reduce: () => {},
  };
}
