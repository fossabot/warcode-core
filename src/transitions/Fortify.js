// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
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
export default (
  { edges }: MatchConfig,
  { territories, currentPlayerIndex }: MatchState
): TransitionType => ({
  guard: ({ fromTerritoryIndex, toTerritoryIndex, armies }) =>
    Number.isInteger(fromTerritoryIndex) &&
    fromTerritoryIndex >= 0 &&
    fromTerritoryIndex < territories.length &&
    territories[fromTerritoryIndex].owner === currentPlayerIndex &&
    territories[fromTerritoryIndex].armies > 1 &&
    Number.isInteger(toTerritoryIndex) &&
    toTerritoryIndex >= 0 &&
    toTerritoryIndex < territories.length &&
    territories[toTerritoryIndex].owner === currentPlayerIndex &&
    edges.some(([a, b]) => a === fromTerritoryIndex && b === toTerritoryIndex) &&
    armies >= 1 &&
    armies < territories[fromTerritoryIndex].armies,
  reduce: ({ fromTerritoryIndex, toTerritoryIndex, armies }) => ({
    territories: replaceElements(territories, {
      [fromTerritoryIndex]: {
        owner: territories[fromTerritoryIndex].owner,
        armies: territories[fromTerritoryIndex].armies - armies,
      },
      [toTerritoryIndex]: {
        owner: territories[toTerritoryIndex].owner,
        armies: territories[toTerritoryIndex].armies + armies,
      },
    }),
  }),
});
