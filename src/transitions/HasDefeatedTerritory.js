// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  const { territories, activeBattle } = extendedState;
  return {
    guard: () => !!activeBattle && territories[activeBattle.defendingTerritoryIndex].armies === 0,
    reduce: () => extendedState,
  };
}
