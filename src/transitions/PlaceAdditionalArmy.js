import {ACTIONS} from '../constants.js';
import TransitionGuarded from './TransitionGuarded';

/**
 * After players claim all territories, players take turns placing one
 * of their undeployed armies on territory they occupy each turn.
 *
 * When a player places an additional army,
 * * The current player looses one undeployed army
 * * The territory armies are incremented
 *
 */
export default function(matchConfig, extendedState) {
  const {territories, currentPlayerIndex} = extendedState;

  const guard = (action) => {
    const {territoryIndex} = action;
    return Number.isInteger(territoryIndex)
      && territoryIndex >= 0
      && territoryIndex < territories.length
      && territories[territoryIndex].owner === currentPlayerIndex
      && territories[territoryIndex].armies >= 1;
  };

  const reduce = (action) => {
    const {territoryIndex} = action;

    return {
      ...extendedState,
      territories: Object.assign([], extendedState.territories, { [territoryIndex]: {
        owner: currentPlayerIndex,
        armies: extendedState.territories[territoryIndex].armies + 1
      }}),
      players: Object.assign([], extendedState.players, { [currentPlayerIndex]: {
        undeployedArmies: extendedState.players[currentPlayerIndex].undeployedArmies - 1
      }})
    };
  };

  return new TransitionGuarded(ACTIONS.PLACE_ADDITIONAL_ARMY, guard, reduce);
}
