import {STATES, PSEUDOSTATES} from '../constants';
import actionCreators from '../actionCreators';
import StateMachine from '../StateMachine';
import testConfig from './config.json';
import {parseMatchConfig} from '../MatchConfig';
import expect from 'expect';

const transitions = StateMachine.getEdges();
const foundStateKeys = (function() {
  const keys = new Set();
  transitions.forEach(([from, to, label]) => {
    keys.add(from);
    keys.add(to);
  });
  return keys;
}());
const isPseudoState = function (stateValue) {
  const pseudostates = new Set();
  for (const k in PSEUDOSTATES) {
    pseudostates.add(PSEUDOSTATES[k]);
  }
  return () => {
    pseudostates.has(stateValue);
  };
};

test('transition states are valid and cover all states', () => {
  const expectedStateKeys = new Set([...STATES, ...PSEUDOSTATES]);
  expect(foundStateKeys).toMatch(expectedStateKeys);
});

// test('states have outbound transition(s) with action', () => {
//   for (const from in STATES) {
//     const transition = transitions[STATES[from]];
//     for (const to in transition) {
//       expect(transition[to].action).toExist(`${STATES[from]} outbound transitions must have an action defined`);
//     }
//   }
// });

test('pseudostates have single outbound else, without a guard or action', () => {
  const elseCount = {};
  transitions.forEach(([from, to , t]) => {
    if (isPseudoState(from) && t.guard === undefined && t.action === undefined) {
      elseCount[to] = elseCount[to] ? elseCount[to]++ : 1;
    }
  });

  const containsDuplicateElse = !!Object.keys(elseCount).find(k => {
    return elseCount[k] > 1;
  });

  expect(containsDuplicateElse).toBe(false);
});

test('single initial state for state machine', () => {
  const stateHasInbound = new Set(transitions.map(([from, to]) => { return to; }));
  const difference = new Set([...foundStateKeys].filter(x => !stateHasInbound.has(x)));
  expect(difference.size).toBe(1);
});

test('single final state', () => {
  const stateHasOutbound = new Set(transitions.map(([from, to]) => { return from; }));
  const difference = new Set([...foundStateKeys].filter(x => !stateHasOutbound.has(x)));
  expect(difference.size).toBe(1);
});

test('test transitions through initial games setup moves', () => {
  const matchConfig = parseMatchConfig(testConfig);
  const stateMachine = new StateMachine(matchConfig);
  let state;

  state = stateMachine.reduce();
  expect(state.stateKey).toEqual(STATES.INITIALIZING);

  state = stateMachine.reduce(state, actionCreators.startMatch(2));
  expect(state.stateKey).toEqual(STATES.SELECTING_FIRST_PLAYER);

  state = stateMachine.reduce(state, actionCreators.selectFirstPlayer(0));
  expect(state.currentPlayerIndex).toEqual(0);
  expect(state.stateKey).toEqual(STATES.OCCUPYING);

  state = stateMachine.reduce(state, actionCreators.occupyTerritory(0));
  expect(state.stateKey).toEqual(STATES.OCCUPYING);
  state = stateMachine.reduce(state, actionCreators.occupyTerritory(1));
  expect(state.stateKey).toEqual(STATES.OCCUPYING);
  state = stateMachine.reduce(state, actionCreators.occupyTerritory(2));
  expect(state.stateKey).toEqual(STATES.OCCUPYING);
  state = stateMachine.reduce(state, actionCreators.occupyTerritory(3));
  expect(state.stateKey).toEqual(STATES.PLACING_ADDITIONAL_ARMY);

  state = stateMachine.reduce(state, actionCreators.placeAdditionalArmy(0));
  expect(state.stateKey).toEqual(STATES.PLACING_ADDITIONAL_ARMY);
  state = stateMachine.reduce(state, actionCreators.placeAdditionalArmy(1));
  expect(state.stateKey).toEqual(STATES.PLACING_ADDITIONAL_ARMY);
  state = stateMachine.reduce(state, actionCreators.placeAdditionalArmy(2));
  expect(state.stateKey).toEqual(STATES.PLACING_ADDITIONAL_ARMY);
  state = stateMachine.reduce(state, actionCreators.placeAdditionalArmy(3));
  expect(state.stateKey).toEqual(STATES.PLACING_NEW_ARMIES);

  let undeployedArmies = state.players[state.currentPlayerIndex].undeployedArmies;
  state = stateMachine.reduce(state, actionCreators.placeNewArmies(0, undeployedArmies));
  expect(state.stateKey).toEqual(STATES.BATTLING);
  state = stateMachine.reduce(state, actionCreators.endAttack());
  expect(state.stateKey).toEqual(STATES.FORTIFYING);
  state = stateMachine.reduce(state, actionCreators.endTurn());
  expect(state.stateKey).toEqual(STATES.PLACING_NEW_ARMIES);

  // todo - battle
  // todo - roll dice
  // todo - foritify
});

test('reducer ignores invalid actions', () => {
  const matchConfig = parseMatchConfig(testConfig);
  const stateMachine = new StateMachine(matchConfig);
  let state;

  state = stateMachine.reduce();
  expect(state.stateKey).toEqual(STATES.INITIALIZING);

  state = stateMachine.reduce(state, actionCreators.startMatch(matchConfig.minPlayers - 1));
  expect(state.stateKey).toEqual(STATES.INITIALIZING);

  state = stateMachine.reduce(state, actionCreators.startMatch(matchConfig.maxPlayers + 1));
  expect(state.stateKey).toEqual(STATES.INITIALIZING);
});
