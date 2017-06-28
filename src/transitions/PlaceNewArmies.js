// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
import replaceElements from './replaceElements';

/**
 * You must place all new armies earned during the beginning of the turn
 * and from trading cards.and
 */
export default function(
  matchConfig: MatchConfig,
  extendedState: MatchState,
  action: string
): TransitionType {
  const { territories, players, currentPlayerIndex } = extendedState;

  return {
    action,
    guard: ({ type, territoryIndex, armies }) =>
      type === action &&
      Number.isInteger(territoryIndex) &&
      territoryIndex >= 0 &&
      territoryIndex < territories.length &&
      territories[territoryIndex].owner === currentPlayerIndex &&
      players[currentPlayerIndex].undeployedArmies >= armies,
    reduce: ({ territoryIndex, armies }) => ({
      ...extendedState,
      territories: replaceElements(extendedState.territories, {
        [territoryIndex]: {
          owner: currentPlayerIndex,
          armies: extendedState.territories[territoryIndex].armies + armies,
        },
      }),
      players: replaceElements(extendedState.players, {
        [currentPlayerIndex]: {
          undeployedArmies: extendedState.players[currentPlayerIndex].undeployedArmies - armies,
        },
      }),
    }),
  };
}
