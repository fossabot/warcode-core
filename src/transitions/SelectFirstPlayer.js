// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

export default (matchConfig: MatchConfig, { players }: MatchState): TransitionType => ({
  guard: ({ firstPlayerIndex }) =>
    Number.isInteger(firstPlayerIndex) &&
    firstPlayerIndex >= 0 &&
    firstPlayerIndex < players.length,
  reduce: ({ firstPlayerIndex }) => ({
    currentPlayerIndex: firstPlayerIndex,
  }),
});
