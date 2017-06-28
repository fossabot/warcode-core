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
export default function(
  matchConfig: MatchConfig,
  extendedState: MatchState,
  action: string
): TransitionType {
  const { territories, activeBattle, currentPlayerIndex } = extendedState;

  return {
    action,
    guard: ({ type, armies }) =>
      type === action &&
      !!activeBattle &&
      Number.isInteger(armies) &&
      armies >= activeBattle.attackingDiceCount &&
      armies < territories[activeBattle.attackingTerritoryIndex].armies,
    reduce: ({ armies }) => {
      if (!activeBattle) {
        return extendedState;
      }
      const { attackingTerritoryIndex, defendingTerritoryIndex } = activeBattle;

      return {
        ...extendedState,
        territories: replaceElements(extendedState.territories, {
          [attackingTerritoryIndex]: {
            owner: extendedState.territories[attackingTerritoryIndex].owner,
            armies: extendedState.territories[attackingTerritoryIndex].armies - armies,
          },
          [defendingTerritoryIndex]: {
            owner: currentPlayerIndex,
            armies,
          },
        }),
        capturedTerritories: extendedState.capturedTerritories + 1,
        activeBattle: undefined,
      };
    },
  };
}
