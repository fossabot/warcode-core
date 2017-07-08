// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from '../TransitionType';

export default (
  config: MatchConfig,
  { players, currentPlayerIndex }: MatchState
): TransitionType => ({
  guard: () => players[currentPlayerIndex].undeployedArmies >= 1,
  reduce: () => {},
});
