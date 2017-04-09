// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import { ACTIONS } from '../constants';
import TransitionGuarded from './TransitionGuarded';
import replaceElements from './replaceElements';

/**
 * During fortification, you may move armies between two of your adjacent
 * territories before ending your turn.
 *
 * Fortification has a few requirements
 * * you own territory to move armies from
 * * you own territory to move armies to
 * * territories are share and adjacent border
 * * armies to move are less than armies on source territory
 *
 *  You may end your turn, skipping fortification.
 */
export default function (matchConfig: MatchConfig, extendedState: MatchState): TransitionGuarded {
  const { edges } = matchConfig;
  const { territories, currentPlayerIndex } = extendedState;

  const guard = (action) => {
    const { fromTerritoryIndex, toTerritoryIndex, armies } = action;
    return Number.isInteger(fromTerritoryIndex)
      && fromTerritoryIndex >= 0
      && fromTerritoryIndex < territories.length
      && territories[fromTerritoryIndex].owner === currentPlayerIndex
      && territories[fromTerritoryIndex].armies > 1
      && Number.isInteger(toTerritoryIndex)
      && toTerritoryIndex >= 0
      && toTerritoryIndex < territories.length
      && territories[toTerritoryIndex].owner === currentPlayerIndex
      && edges.some(([a, b]) => a === fromTerritoryIndex && b === toTerritoryIndex)
      && armies >= 1
      && armies < territories[fromTerritoryIndex].armies;
  };

  const reduce = (action) => {
    const { fromTerritoryIndex, toTerritoryIndex, armies } = action;

    return {
      ...extendedState,
      territories: replaceElements(extendedState.territories, {
        [fromTerritoryIndex]: {
          owner: extendedState.territories[fromTerritoryIndex].owner,
          armies: extendedState.territories[fromTerritoryIndex].armies - armies,
        },
        [toTerritoryIndex]: {
          owner: extendedState.territories[toTerritoryIndex].owner,
          armies: extendedState.territories[toTerritoryIndex].armies + armies,
        },
      }),
    };
  };

  return new TransitionGuarded(ACTIONS.FORTIFY, guard, reduce);
}
