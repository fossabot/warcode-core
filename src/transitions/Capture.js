import {ACTIONS} from '../constants';
import TransitionGuarded from './TransitionGuarded';

/**
 * When you defeat all armies on a defending territory, you must occupy it by
 * moving armies from the attacking territory. The number of armies moved must
 * be at least the same number of dice rolled in the decisive battle.
 */
export default function(matchConfig, extendedState) {
  const {territories, activeBattle, currentPlayerIndex} = extendedState;

  const guard = (action) => {
    const {armies} = action;
    const {attackingTerritoryIndex, attackingDiceCount} = activeBattle;
    return Number.isInteger(armies)
      && armies >= attackingDiceCount
      && armies < territories[attackingTerritoryIndex].armies;
  };

  const reduce = (action) => {
    const {armies} = action;
    const {attackingTerritoryIndex, defendingTerritoryIndex} = activeBattle;

    return {
      ...extendedState,
      territories: Object.assign([], extendedState.territories, {
        [attackingTerritoryIndex]: {
          owner: extendedState.territories[attackingTerritoryIndex].owner,
          armies: extendedState.territories[attackingTerritoryIndex].armies - armies
        },
        [defendingTerritoryIndex]: {
          owner: currentPlayerIndex,
          armies: armies
        }
      }),
      capturedTerritories: extendedState.capturedTerritories + 1,
      activeBattle: undefined
    };
  };

  return new TransitionGuarded(ACTIONS.CAPTURE, guard, reduce);
}
