// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
import replaceElements from './utils/replaceElements';

export default (
  matchConfig: MatchConfig,
  { territories, currentPlayerIndex, players }: MatchState
): TransitionType => ({
  guard: ({ territoryIndex }) =>
    Number.isInteger(territoryIndex) &&
    territoryIndex >= 0 &&
    territoryIndex < territories.length &&
    territories[territoryIndex].owner === undefined &&
    territories[territoryIndex].armies === 0,
  reduce: ({ territoryIndex }) => ({
    territories: replaceElements(territories, {
      [territoryIndex]: {
        owner: currentPlayerIndex,
        armies: 1,
      },
    }),
    players: replaceElements(players, {
      [currentPlayerIndex]: {
        undeployedArmies: players[currentPlayerIndex].undeployedArmies - 1,
      },
    }),
  }),
});
