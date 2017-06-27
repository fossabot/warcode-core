// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
import { ACTIONS } from '../constants';

export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  const { territories } = extendedState;

  return {
    guard: ({ type }) =>
      (type === ACTIONS.SELECT_FIRST_PLAYER || ACTIONS.OCCUPY_TERRITORY) &&
      territories.some(t => t.armies === 0),
    reduce: () => extendedState,
  };
}
