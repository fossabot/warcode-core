import { STATES } from './constants';
import { getTransition } from './transitions/';

const intialState = {
  state: STATES.INITIALIZING,
  territories: [],
  cardOwner: [],
  playersUndeployedArmies: [],
  currentPlayer: -1,
  trades: 0,
  captured: 0,
};

const reduce = (matchConfig, extendedState = intialState, action = {}, ttl = 10) => {
  if (ttl < 1) {
    // console.error(`state machine entered a loop ${extendedState.state}`);
    return extendedState;
  }

  const transition = getTransition(matchConfig, extendedState, action);

  // quit when reached final state / transition for the given action
  if (!transition) {
    return extendedState;
  }

  // return next state to transition to
  const nextState = {
    ...extendedState, // start with base state
    ...transition.reduce(action), // apply transition updates
    ...{ state: transition.to }, // set the state
  };

  return reduce(matchConfig, nextState, action, ttl - 1);
};

export default matchConfig => ({
  isActionValid: (matchState, action) => !Object.is(matchState, reduce(matchState, action)),
  reduce: (extendedState, action) => reduce(matchConfig, extendedState, action),
});
