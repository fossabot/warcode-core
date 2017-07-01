// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
import replaceElements from './replaceElements';

/**
 * When you defeat all armies on a defending territory, you must occupy it by
 * moving armies from the attacking territory. The number of armies moved must
 * be at least the same number of dice rolled in the decisive battle.
 */
export default (
  matchConfig: MatchConfig,
  { territories, capturedTerritories, activeBattle, currentPlayerIndex }: MatchState
): TransitionType => ({
  guard: ({ armies }) =>
    !!activeBattle &&
    Number.isInteger(armies) &&
    armies >= activeBattle.attackingDiceCount &&
    armies < territories[activeBattle.attackingTerritoryIndex].armies,
  reduce: ({ armies }) => {
    if (!activeBattle) {
      return {};
    }
    const { attackingTerritoryIndex, defendingTerritoryIndex } = activeBattle;

    return {
      territories: replaceElements(territories, {
        [attackingTerritoryIndex]: {
          owner: territories[attackingTerritoryIndex].owner,
          armies: territories[attackingTerritoryIndex].armies - armies,
        },
        [defendingTerritoryIndex]: {
          owner: currentPlayerIndex,
          armies,
        },
      }),
      capturedTerritories: capturedTerritories + 1,
      activeBattle: undefined,
    };
  },
});
