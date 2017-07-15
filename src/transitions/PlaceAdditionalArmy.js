// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';
import replaceElements from './utils/replaceElements';

export default (
  config: MatchConfig,
  { playersUndeployedArmies, territories, currentPlayer }: MatchState
): TransitionType => ({
  guard: ({ territory }) =>
    Number.isInteger(territory) &&
    territory >= 0 &&
    territory < territories.length &&
    territories[territory].owner === currentPlayer &&
    territories[territory].armies >= 1,
  reduce: ({ territory }) => ({
    territories: replaceElements(territories, {
      [territory]: {
        owner: currentPlayer,
        armies: territories[territory].armies + 1,
      },
    }),
    playersUndeployedArmies: replaceElements(playersUndeployedArmies, {
      [currentPlayer]: playersUndeployedArmies[currentPlayer] - 1,
    }),
  }),
});
