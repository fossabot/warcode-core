// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';

export default (config: MatchConfig, { playersUndeployedArmies }: MatchState): TransitionType => ({
  guard: ({ firstPlayer }) =>
    Number.isInteger(firstPlayer) &&
    firstPlayer >= 0 &&
    firstPlayer < playersUndeployedArmies.length,
  reduce: ({ firstPlayer }) => ({
    currentPlayer: firstPlayer,
  }),
});
