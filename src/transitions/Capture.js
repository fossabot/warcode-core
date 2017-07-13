// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';
import replaceElements from './utils/replaceElements';

export default (
  config: MatchConfig,
  { territories, captured, activeBattle, currentPlayer }: MatchState
): TransitionType => ({
  guard: ({ armies }) =>
    !!activeBattle &&
    Number.isInteger(armies) &&
    armies >= activeBattle.attackingDiceCount &&
    armies < territories[activeBattle.attackingTerritory].armies,
  reduce: ({ armies }) => {
    if (!activeBattle) {
      return {};
    }
    const { attackingTerritory, defendingTerritory } = activeBattle;

    return {
      territories: replaceElements(territories, {
        [attackingTerritory]: {
          owner: territories[attackingTerritory].owner,
          armies: territories[attackingTerritory].armies - armies,
        },
        [defendingTerritory]: {
          owner: currentPlayer,
          armies,
        },
      }),
      captured: captured + 1,
      activeBattle: undefined,
    };
  },
});
