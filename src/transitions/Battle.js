// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

export default (
  { edges }: MatchConfig,
  { territories, currentPlayerIndex }: MatchState
): TransitionType => ({
  guard: ({ attackingTerritoryIndex, defendingTerritoryIndex, attackingDiceCount }) =>
    Number.isInteger(attackingTerritoryIndex) &&
    attackingTerritoryIndex >= 0 &&
    attackingTerritoryIndex < territories.length &&
    territories[attackingTerritoryIndex].owner === currentPlayerIndex &&
    territories[attackingTerritoryIndex].armies > 1 &&
    Number.isInteger(defendingTerritoryIndex) &&
    defendingTerritoryIndex >= 0 &&
    defendingTerritoryIndex < territories.length &&
    territories[defendingTerritoryIndex].owner !== currentPlayerIndex &&
    edges.some(([a, d]) => a === attackingTerritoryIndex && d === defendingTerritoryIndex) &&
    attackingDiceCount >= 1 &&
    attackingDiceCount <= Math.min(3, territories[attackingTerritoryIndex].armies - 1),
  reduce: ({ attackingTerritoryIndex, defendingTerritoryIndex, attackingDiceCount }) => ({
    activeBattle: {
      attackingTerritoryIndex,
      defendingTerritoryIndex,
      attackingDiceCount,
    },
  }),
});
