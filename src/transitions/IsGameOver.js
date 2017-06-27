// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  const { territories, currentPlayerIndex } = extendedState;
  return {
    guard: () => territories.every(t => t.owner === currentPlayerIndex),
    reduce: () => extendedState,
  };
}
