import { STATES } from './constants';
import transitions from './transitions/';

// @return {{nextStateKey: string, reduce: Function}} transition object, may to pseudostate
const getTransition = (matchConfig, extendedState, action) => {
  const fromCurrentState = transitions
    .filter(([from]) => from === extendedState.stateKey)
    .map(([from, to, t]) => [from, to, t(matchConfig, extendedState)]);

  // get transitions that could be followed from the current state
  const guardSatisfied = fromCurrentState.filter(
    ([, , { guard }]) => typeof guard === 'function' && guard(action) === true
  );

  const elses = fromCurrentState.filter(([, , { guard }]) => guard === undefined);

  // quit when there path is indeterminant, meaning there are multiple transitions
  if (guardSatisfied.length > 1 || elses.length > 1) {
    // there is an error in the state machine
    // console.error(`nondeterministic state`);
    return undefined;
  }

  // stop when blocked by transition guards
  const nextTranstion = guardSatisfied[0] || elses[0];

  if (nextTranstion) {
    const [, nextStateKey, { reduce }] = nextTranstion;
    return { nextStateKey, reduce: () => reduce(action) };
  }

  return undefined;
};

const intialState = { stateKey: STATES.INITIALIZING };

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
    ...transition.reduce(),
    ...{ stateKey: transition.nextStateKey },
  };

  return reduce(matchConfig, nextState, action, ttl - 1);
};

export default matchConfig => ({
  // TODO - note that the final, game winning action may be invalid
  isActionValid: (matchState, action) => !Object.is(matchState, reduce(matchState, action)),
  reduce: (extendedState, action) => reduce(matchConfig, extendedState, action),
});
