// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
import { ACTIONS } from '../constants';

/**
 * You end the turn, ending fortification.
 */
export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  return {
    guard: ({ type }) => type === ACTIONS.END_TURN,
    reduce: () => extendedState,
  };
}
