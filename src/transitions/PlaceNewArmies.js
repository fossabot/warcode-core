// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
import replaceElements from './utils/replaceElements';

export default (
  matchConfig: MatchConfig,
  { territories, players, currentPlayerIndex }: MatchState
): TransitionType => ({
  guard: ({ territoryIndex, armies }) =>
    Number.isInteger(territoryIndex) &&
    territoryIndex >= 0 &&
    territoryIndex < territories.length &&
    territories[territoryIndex].owner === currentPlayerIndex &&
    players[currentPlayerIndex].undeployedArmies >= armies,
  reduce: ({ territoryIndex, armies }) => ({
    territories: replaceElements(territories, {
      [territoryIndex]: {
        owner: currentPlayerIndex,
        armies: territories[territoryIndex].armies + armies,
      },
    }),
    players: replaceElements(players, {
      [currentPlayerIndex]: {
        undeployedArmies: players[currentPlayerIndex].undeployedArmies - armies,
      },
    }),
  }),
});
