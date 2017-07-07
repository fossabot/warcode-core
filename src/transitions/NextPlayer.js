// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
import nextPlayerIndex from './utils/nextPlayerIndex';

export default (matchConfig: MatchConfig, extendedState: MatchState): TransitionType => ({
  guard: undefined,
  reduce: () => ({
    currentPlayerIndex: nextPlayerIndex(extendedState),
  }),
});
