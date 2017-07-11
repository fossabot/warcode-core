// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';

export default (config: MatchConfig, { playersUndeployedArmies }: MatchState): TransitionType => ({
  guard: ({ firstPlayerIndex }) =>
    Number.isInteger(firstPlayerIndex) &&
    firstPlayerIndex >= 0 &&
    firstPlayerIndex < playersUndeployedArmies.length,
  reduce: ({ firstPlayerIndex }) => ({
    currentPlayerIndex: firstPlayerIndex,
  }),
});
