//@flow
import type {MatchConfig} from '../MatchConfig';
import type {MatchState} from '../MatchState';
import {ACTIONS} from '../constants';
import TransitionGuarded from './TransitionGuarded';

/**
 * You end the turn, ending fortification.
 */
export default function(matchConfig: MatchConfig, extendedState: MatchState): TransitionGuarded {

  const guard = (action) => {
    return true;
  };

  const reduce = (action) => {
    return extendedState;
  };

  return new TransitionGuarded(ACTIONS.END_TURN, guard, reduce);
}
