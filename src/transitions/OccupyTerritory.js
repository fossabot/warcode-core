// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
import { ACTIONS } from '../constants';
import replaceElements from './replaceElements';

/**
 * At the start of the game, each player takes turns placing a single army
 * on an unoccupied territory.
 *
 * To occupy the territory, you must place an army on an unoccupied territory.
 * An unoccupied territory must have no owner or occupying armies.
 *
 * Upon occupying the territory
 * * The current player's undeployed armies are decremented
 * * The territory owner is updated to the current layer
 * * The territory armies are set to one
 * * Turn is passed to the next player
 *
 */
export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  const { territories, currentPlayerIndex } = extendedState;

  return {
    guard: ({ type, territoryIndex }) =>
      type === ACTIONS.OCCUPY_TERRITORY &&
      Number.isInteger(territoryIndex) &&
      territoryIndex >= 0 &&
      territoryIndex < territories.length &&
      territories[territoryIndex].owner === undefined &&
      territories[territoryIndex].armies === 0,
    reduce: ({ territoryIndex }) => ({
      ...extendedState,
      territories: replaceElements(extendedState.territories, {
        [territoryIndex]: {
          owner: currentPlayerIndex,
          armies: 1,
        },
      }),
      players: replaceElements(extendedState.players, {
        [currentPlayerIndex]: {
          undeployedArmies: extendedState.players[currentPlayerIndex].undeployedArmies - 1,
        },
      }),
    }),
  };
}
