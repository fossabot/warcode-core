// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';

/**
 * Player has placed all armies from the start of the game.
 */
export default (config: MatchConfig, { players }: MatchState): TransitionType => ({
  guard: () => players.every(p => p.undeployedArmies === 0),
  reduce: () => {},
});
