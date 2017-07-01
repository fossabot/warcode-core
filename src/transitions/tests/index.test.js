import { transitions } from '../';
import { ACTIONS, STATES, PSEUDOSTATES } from '../../constants';
// import testConfig from './config.json';
// import StateMachine from '../../StateMachine';
// import parseMatchConfig from '../../MatchConfig';

// array contiain unqiue entries for each unique state and pseudostate value in game
const stateKeys = Array.from(
  new Set([...transitions.map(([from]) => from), ...transitions.map(([, to]) => to)])
);

test('transition states are valid and cover all states', () => {
  const expectedStateKeys = Array.from(
    new Set([...Object.values(STATES), ...Object.values(PSEUDOSTATES)])
  );

  // Arrays of state keys from graph and contsants should have same values, though order may vary
  expect(stateKeys).toEqual(expect.arrayContaining(expectedStateKeys));
  expect(expectedStateKeys).toEqual(expect.arrayContaining(stateKeys));
});

test('single initial state for state machine', () => {
  const stateHasInbound = new Set(transitions.map(([, to]) => to));
  const difference = new Set([...stateKeys].filter(x => !stateHasInbound.has(x)));
  expect(difference.size).toBe(1);
});

test('single final state', () => {
  // final states no outbound transitions
  const statesWithOutbound = new Set(transitions.map(([from]) => from)).size;
  const allStates = stateKeys.length;
  expect(allStates - statesWithOutbound).toBe(1);
});

test('actions are string or optional', () => {
  const actions = Object.values(ACTIONS);
  transitions.forEach(([, , , action]) => {
    expect(action === undefined || actions.includes(action)).toBe(true);
  });
});

// test('pseudostates have single outbound else, without a guard or action', () => {
//   const config = parseMatchConfig(testConfig);
//   const initState = StateMachine(config).reduce();
//   const transitionsAtInit = transitions.map(([from, to, t]) => [from, to, t(config, initState)]);
//   const PSEUDOSTATES_VALUES = Object.keys(PSEUDOSTATES).map(key => PSEUDOSTATES[key]);
//   const elseTransitionDesitinations = transitionsAtInit
//     .filter(([from, , t]) => PSEUDOSTATES_VALUES.includes(from) && t.guard === undefined)
//     .map(([, to]) => to);
//
//   expect(elseTransitionDesitinations.length).toEqual(new Set(elseTransitionDesitinations).size);
// });

// TODO test getTransition
