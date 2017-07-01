// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

export default (
  matchConfig: MatchConfig,
  { territories, currentPlayerIndex }: MatchState
): TransitionType => ({
  guard: () => territories.every(t => t.owner === currentPlayerIndex),
  reduce: () => {},
});
