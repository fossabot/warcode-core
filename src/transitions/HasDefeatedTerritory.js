// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
import { ACTIONS } from '../constants';

export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  const { territories, activeBattle } = extendedState;
  return {
    guard: ({ type }) =>
      type === ACTIONS.ROLL_DICE &&
      !!activeBattle &&
      territories[activeBattle.defendingTerritoryIndex].armies === 0,
    reduce: () => extendedState,
  };
}
