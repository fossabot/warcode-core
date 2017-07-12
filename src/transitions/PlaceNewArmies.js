// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';
import replaceElements from './utils/replaceElements';

export default (
  config: MatchConfig,
  { territories, playersUndeployedArmies, currentPlayer }: MatchState
): TransitionType => ({
  guard: ({ territoryIndex, armies }) =>
    Number.isInteger(territoryIndex) &&
    territoryIndex >= 0 &&
    territoryIndex < territories.length &&
    territories[territoryIndex].owner === currentPlayer &&
    playersUndeployedArmies[currentPlayer] >= armies,
  reduce: ({ territoryIndex, armies }) => ({
    territories: replaceElements(territories, {
      [territoryIndex]: {
        owner: currentPlayer,
        armies: territories[territoryIndex].armies + armies,
      },
    }),
    playersUndeployedArmies: replaceElements(playersUndeployedArmies, {
      [currentPlayer]: playersUndeployedArmies[currentPlayer] - armies,
    }),
  }),
});
