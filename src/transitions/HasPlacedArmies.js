// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';

/**
 * Player has placed all armies from the start of the game.
 */
export default (config: MatchConfig, { playersUndeployedArmies }: MatchState): TransitionType => ({
  guard: () => playersUndeployedArmies.every(p => p === 0),
  reduce: () => {},
});
