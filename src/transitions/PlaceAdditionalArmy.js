// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';
import replaceElements from './utils/replaceElements';

export default (
  config: MatchConfig,
  { playersUndeployedArmies, territories, currentPlayer }: MatchState
): TransitionType => ({
  guard: ({ territoryIndex }) =>
    Number.isInteger(territoryIndex) &&
    territoryIndex >= 0 &&
    territoryIndex < territories.length &&
    territories[territoryIndex].owner === currentPlayer &&
    territories[territoryIndex].armies >= 1,
  reduce: ({ territoryIndex }) => ({
    territories: replaceElements(territories, {
      [territoryIndex]: {
        owner: currentPlayer,
        armies: territories[territoryIndex].armies + 1,
      },
    }),
    playersUndeployedArmies: replaceElements(playersUndeployedArmies, {
      [currentPlayer]: playersUndeployedArmies[currentPlayer] - 1,
    }),
  }),
});
