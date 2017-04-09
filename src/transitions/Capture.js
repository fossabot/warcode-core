// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import { ACTIONS } from '../constants';
import TransitionGuarded from './TransitionGuarded';
import replaceElements from './replaceElements';

/**
 * When you defeat all armies on a defending territory, you must occupy it by
 * moving armies from the attacking territory. The number of armies moved must
 * be at least the same number of dice rolled in the decisive battle.
 */
export default function (matchConfig: MatchConfig, extendedState: MatchState): TransitionGuarded {
  const { territories, activeBattle, currentPlayerIndex } = extendedState;

  const guard = (action) => {
    const { armies } = action;
    return !!activeBattle
      && Number.isInteger(armies)
      && armies >= activeBattle.attackingDiceCount
      && armies < territories[activeBattle.attackingTerritoryIndex].armies;
  };

  const reduce = (action) => {
    const { armies } = action;
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
  };

  return new TransitionGuarded(ACTIONS.CAPTURE, guard, reduce);
}
