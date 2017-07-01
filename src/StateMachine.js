import { STATES } from './constants';
import { getTransition } from './transitions/';

const intialState = { stateKey: STATES.INITIALIZING };

// TODO - write reducer with debug
// MyAction: StartState->NextState->NextState

const reduce = (matchConfig, extendedState = intialState, action = {}, ttl = 10) => {
  if (ttl < 1) {
    // console.error(`state machine entered a loop ${extendedState.stateKey}`);
    return extendedState;
  }

  const transition = getTransition(matchConfig, extendedState, action);

  // quit when reached final state / transition for the given action
  if (!transition) {
    return extendedState;
  }

  // return next state to transition to
  const nextState = {
    ...transition.reduce(action),
    ...{ stateKey: transition.to },
  };

  return reduce(matchConfig, nextState, action, ttl - 1);
};

export default matchConfig => ({
  isActionValid: (matchState, action) => !Object.is(matchState, reduce(matchState, action)),
  reduce: (extendedState, action) => reduce(matchConfig, extendedState, action),
});
