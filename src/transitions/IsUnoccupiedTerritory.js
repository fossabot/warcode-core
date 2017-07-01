// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  const { territories } = extendedState;

  return {
    guard: () => territories.some(t => t.armies === 0),
    reduce: () => extendedState,
  };
}
