// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';

export default (
  { edges }: MatchConfig,
  { territories, currentPlayer }: MatchState
): TransitionType => ({
  guard: ({ attackingTerritory, defendingTerritory, attackingDiceCount }) =>
    Number.isInteger(attackingTerritory) &&
    attackingTerritory >= 0 &&
    attackingTerritory < territories.length &&
    territories[attackingTerritory].owner === currentPlayer &&
    territories[attackingTerritory].armies > 1 &&
    Number.isInteger(defendingTerritory) &&
    defendingTerritory >= 0 &&
    defendingTerritory < territories.length &&
    territories[defendingTerritory].owner !== currentPlayer &&
    edges.some(([a, d]) => a === attackingTerritory && d === defendingTerritory) &&
    attackingDiceCount >= 1 &&
    attackingDiceCount <= Math.min(3, territories[attackingTerritory].armies - 1),
  reduce: ({ attackingTerritory, defendingTerritory, attackingDiceCount }) => ({
    activeBattle: {
      attackingTerritory,
      defendingTerritory,
      attackingDiceCount,
    },
  }),
});
