// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
import { ACTIONS } from '../constants';

export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  const { players, currentPlayerIndex } = extendedState;

  return {
    guard: ({ type }) =>
      type === ACTIONS.PLACE_NEW_ARMIES && players[currentPlayerIndex].undeployedArmies >= 1,
    reduce: () => extendedState,
  };
}
