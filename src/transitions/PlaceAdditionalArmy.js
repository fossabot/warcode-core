// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';
import replaceElements from './utils/replaceElements';

export default (
  config: MatchConfig,
  { playersUndeployedArmies, territories, currentPlayerIndex }: MatchState
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
    playersUndeployedArmies: replaceElements(playersUndeployedArmies, {
      [currentPlayerIndex]: playersUndeployedArmies[currentPlayerIndex] - 1,
    }),
  }),
});
