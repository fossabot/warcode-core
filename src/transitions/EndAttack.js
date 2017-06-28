// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';

/**
 * You may stop attacking opponent's territories at anytime.
 */
export default function(
  matchConfig: MatchConfig,
  extendedState: MatchState,
  action: string
): TransitionType {
  return {
    action,
    guard: ({ type }) => type === action,
    reduce: () => extendedState,
  };
}
