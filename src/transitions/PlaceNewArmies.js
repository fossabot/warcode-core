import {ACTIONS} from '../constants';
import TransitionGuarded from './TransitionGuarded';

/**
 * You must place all new armies earned during the beginning of the turn
 * and from trading cards.and
 */
export default function(matchConfig, extendedState) {
  const {territories, players, currentPlayerIndex} = extendedState;

  const guard = (action) => {
    const {territoryIndex, armies} = action;

    return Number.isInteger(territoryIndex)
      && territoryIndex >= 0
      && territoryIndex < territories.length
      && territories[territoryIndex].owner === currentPlayerIndex
      && players[currentPlayerIndex].undeployedArmies >= armies;
  };

  const reduce = (action) => {
    const {territoryIndex, armies} = action;

    return {
      ...extendedState,
      territories: Object.assign([], extendedState.territories, { [territoryIndex]: {
        owner: currentPlayerIndex,
        armies: extendedState.territories[territoryIndex].armies + armies
      }}),
      players: Object.assign([], extendedState.players, { [currentPlayerIndex]: {
        undeployedArmies: extendedState.players[currentPlayerIndex].undeployedArmies - armies
      }})
    }
  };

  return new TransitionGuarded(ACTIONS.PLACE_NEW_ARMIES, guard, reduce);
}
