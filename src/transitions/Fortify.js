// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';
import replaceElements from './utils/replaceElements';

export default (
  { edges }: MatchConfig,
  { territories, currentPlayer }: MatchState
): TransitionType => ({
  guard: ({ fromTerritory, toTerritory, armies }) =>
    Number.isInteger(fromTerritory) &&
    fromTerritory >= 0 &&
    fromTerritory < territories.length &&
    territories[fromTerritory].owner === currentPlayer &&
    territories[fromTerritory].armies > 1 &&
    Number.isInteger(toTerritory) &&
    toTerritory >= 0 &&
    toTerritory < territories.length &&
    territories[toTerritory].owner === currentPlayer &&
    edges.some(([a, b]) => a === fromTerritory && b === toTerritory) &&
    armies >= 1 &&
    armies < territories[fromTerritory].armies,
  reduce: ({ fromTerritory, toTerritory, armies }) => ({
    territories: replaceElements(territories, {
      [fromTerritory]: {
        owner: territories[fromTerritory].owner,
        armies: territories[fromTerritory].armies - armies,
      },
      [toTerritory]: {
        owner: territories[toTerritory].owner,
        armies: territories[toTerritory].armies + armies,
      },
    }),
  }),
});
