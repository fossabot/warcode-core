import {ACTIONS} from '../constants.js';
import TransitionGuarded from './TransitionGuarded';

/**
 * You may stop attacking opponent's territories at anytime.
 */
export default function(matchConfig, extendedState) {
  const guard = (action) => {
    return true;
  };

  const reduce = (action) => {
    return extendedState;
  };

  return new TransitionGuarded(ACTIONS.END_ATTACK, guard, reduce);
}
