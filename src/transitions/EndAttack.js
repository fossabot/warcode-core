//@flow
import type {MatchConfig} from '../MatchConfig';
import type {MatchState} from '../MatchState';
import {ACTIONS} from '../constants';
import TransitionGuarded from './TransitionGuarded';

/**
 * You may stop attacking opponent's territories at anytime.
 */
export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionGuarded {
  const guard = (action) => {
    return true;
  };

  const reduce = (action) => {
    return extendedState;
  };

  return new TransitionGuarded(ACTIONS.END_ATTACK, guard, reduce);
}
