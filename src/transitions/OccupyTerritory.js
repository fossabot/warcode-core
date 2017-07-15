// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';
import replaceElements from './utils/replaceElements';

export default (
  config: MatchConfig,
  { territories, currentPlayer, playersUndeployedArmies }: MatchState
): TransitionType => ({
  guard: ({ territory }) =>
    Number.isInteger(territory) &&
    territory >= 0 &&
    territory < territories.length &&
    territories[territory].owner === undefined &&
    territories[territory].armies === 0,
  reduce: ({ territory }) => ({
    territories: replaceElements(territories, {
      [territory]: {
        owner: currentPlayer,
        armies: 1,
      },
    }),
    playersUndeployedArmies: replaceElements(playersUndeployedArmies, {
      [currentPlayer]: playersUndeployedArmies[currentPlayer] - 1,
    }),
  }),
});
