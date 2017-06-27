// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
import { ACTIONS } from '../constants';

/**
 * You may stop attacking opponent's territories at anytime.
 */
export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  return {
    guard: ({ type }) => type === ACTIONS.END_ATTACK,
    reduce: () => extendedState,
  };
}
