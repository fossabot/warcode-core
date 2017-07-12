// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';

/**
 * Player has one or more armies to deploy
 */
export default function HasUndeployedArmies(
  config: MatchConfig,
  { playersUndeployedArmies, currentPlayer }: MatchState
): TransitionType {
  return {
    guard: () => playersUndeployedArmies[currentPlayer] >= 1,
    reduce: () => {},
  };
}
