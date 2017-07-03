// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
import replaceElements from './replaceElements';

export default (
  matchConfig: MatchConfig,
  { players, territories, currentPlayerIndex }: MatchState
): TransitionType => ({
  guard: ({ territoryIndex }) =>
    Number.isInteger(territoryIndex) &&
    territoryIndex >= 0 &&
    territoryIndex < territories.length &&
    territories[territoryIndex].owner === currentPlayerIndex &&
    territories[territoryIndex].armies >= 1,
  reduce: ({ territoryIndex }) => ({
    territories: replaceElements(territories, {
      [territoryIndex]: {
        owner: currentPlayerIndex,
        armies: territories[territoryIndex].armies + 1,
      },
    }),
    players: replaceElements(players, {
      [currentPlayerIndex]: {
        undeployedArmies: players[currentPlayerIndex].undeployedArmies - 1,
      },
    }),
  }),
});
