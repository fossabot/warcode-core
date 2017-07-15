// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';
import replaceElements from './utils/replaceElements';

export default (
  config: MatchConfig,
  { territories, playersUndeployedArmies, currentPlayer }: MatchState
): TransitionType => ({
  guard: ({ territory, armies }) =>
    Number.isInteger(territory) &&
    territory >= 0 &&
    territory < territories.length &&
    territories[territory].owner === currentPlayer &&
    playersUndeployedArmies[currentPlayer] >= armies,
  reduce: ({ territory, armies }) => ({
    territories: replaceElements(territories, {
      [territory]: {
        owner: currentPlayer,
        armies: territories[territory].armies + armies,
      },
    }),
    playersUndeployedArmies: replaceElements(playersUndeployedArmies, {
      [currentPlayer]: playersUndeployedArmies[currentPlayer] - armies,
    }),
  }),
});
