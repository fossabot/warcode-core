import {ACTIONS} from '../constants';
import TransitionGuarded from './TransitionGuarded';

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
export default function(matchConfig, extendedState) {
  const {territories, currentPlayerIndex} = extendedState;

  const guard = (action) => {
    const {territoryIndex} = action;
    return Number.isInteger(territoryIndex)
      && territoryIndex >= 0
      && territoryIndex < territories.length
      && territories[territoryIndex].owner === undefined
      && territories[territoryIndex].armies === 0;
  };

  const reduce = (action) => {
    const {territoryIndex} = action;

    return {
      ...extendedState,
      territories: Object.assign([], extendedState.territories, { [territoryIndex]: {
        owner: currentPlayerIndex,
        armies: 1
      }}),
      players: Object.assign([], extendedState.players, { [currentPlayerIndex]: {
        undeployedArmies: extendedState.players[currentPlayerIndex].undeployedArmies - 1
      }})
    };
  };

  return new TransitionGuarded(ACTIONS.OCCUPY_TERRITORY, guard, reduce);
}
