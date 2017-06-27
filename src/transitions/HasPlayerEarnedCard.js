// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
import { ACTIONS } from '../constants';

export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  const { cardOwner, capturedTerritories } = extendedState;
  return {
    guard: ({ type }) =>
      (type === ACTIONS.FORTIFY || type === ACTIONS.END_TURN) &&
      capturedTerritories > 0 &&
      cardOwner.some(owner => owner !== undefined),
    reduce: () => extendedState,
  };
}
