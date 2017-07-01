// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  const { players } = extendedState;
  return {
    guard: () => players.every(p => p.undeployedArmies === 0),
    reduce: () => extendedState,
  };
}
