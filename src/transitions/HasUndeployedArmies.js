// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';

/**
 * Player has one or more armies to deploy
 */
export default function HasUndeployedArmies(
  config: MatchConfig,
  { playersUndeployedArmies, currentPlayerIndex }: MatchState
): TransitionType {
  return {
    guard: () => playersUndeployedArmies[currentPlayerIndex] >= 1,
    reduce: () => {},
  };
}
