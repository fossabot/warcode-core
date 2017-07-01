// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  const { players, currentPlayerIndex } = extendedState;

  return {
    guard: () => players[currentPlayerIndex].undeployedArmies >= 1,
    reduce: () => extendedState,
  };
}
