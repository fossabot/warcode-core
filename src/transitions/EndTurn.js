import {ACTIONS} from '../constants.js';
import TransitionGuarded from './TransitionGuarded';

/**
 * You end the turn, ending fortification.
 */
export default function(matchConfig, extendedState) {

  const guard = (action) => {
    return true;
  };

  const reduce = (action) => {
    return extendedState;
  };

  return new TransitionGuarded(ACTIONS.END_TURN, guard, reduce);
}
