// @flow
import type { MatchConfig } from '../MatchConfig';
import type { MatchState } from '../MatchState';
import type { TransitionType } from './TransitionType';
/**

 * You end the turn, ending fortification.
 */
export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionType {
  return {
    guard: () => true,
    reduce: () => extendedState,
  };
}
