import expect from 'expect';
import { STATES, PSEUDOSTATES } from '../constants';
import actionCreators from '../actionCreators';
import StateMachine from '../StateMachine';
import testConfig from './config.json';
import parseMatchConfig from '../MatchConfig';

const matchConfig = parseMatchConfig(testConfig);
const stateMachine = new StateMachine(matchConfig);
const transitions = stateMachine.getTransitions(stateMachine.reduce());
const setOfAllStateKeys = new Set([
  ...transitions.map(([from]) => from),
  ...transitions.map(([, to]) => to),
]);
const PSEUDOSTATES_VALUES = Object.keys(PSEUDOSTATES).map(key => PSEUDOSTATES[key]);
const isPseudoState = stateValue => PSEUDOSTATES_VALUES.includes(stateValue);

test('transition states are valid and cover all states', () => {
  const expectedStateKeys = new Set([...STATES, ...PSEUDOSTATES]);
  expect(setOfAllStateKeys).toMatch(expectedStateKeys);
});

test('pseudostates have single outbound else, without a guard or action', () => {
  const elseTransitionDesitinations = transitions
    .filter(([from, , t]) => isPseudoState(from) && t.guard === undefined && t.action === undefined)
    .map(([, to]) => to);

  expect(elseTransitionDesitinations.length).toEqual(new Set(elseTransitionDesitinations).size);
});

test('single initial state for state machine', () => {
  const stateHasInbound = new Set(transitions.map(([, to]) => to));
  const difference = new Set([...setOfAllStateKeys].filter(x => !stateHasInbound.has(x)));
  expect(difference.size).toBe(1);
});

test('single final state', () => {
  const stateHasOutbound = new Set(transitions.map(([from]) => from));
  const difference = new Set([...setOfAllStateKeys].filter(x => !stateHasOutbound.has(x)));
  expect(difference.size).toBe(1);
});

test('test transitions through initial games setup moves', () => {
  const actionsAndExpectations = [
    [actionCreators.startMatch(2), STATES.SELECTING_FIRST_PLAYER],
    [actionCreators.selectFirstPlayer(0), STATES.OCCUPYING, 0],
    [actionCreators.occupyTerritory(0), STATES.OCCUPYING],
    [actionCreators.occupyTerritory(1), STATES.OCCUPYING],
    [actionCreators.occupyTerritory(2), STATES.OCCUPYING],
    [actionCreators.occupyTerritory(3), STATES.PLACING_ADDITIONAL_ARMY],
    [actionCreators.placeAdditionalArmy(0), STATES.PLACING_ADDITIONAL_ARMY],
    [actionCreators.placeAdditionalArmy(1), STATES.PLACING_ADDITIONAL_ARMY],
    [actionCreators.placeAdditionalArmy(2), STATES.PLACING_ADDITIONAL_ARMY],
    [actionCreators.placeAdditionalArmy(3), STATES.PLACING_NEW_ARMIES],
    [actionCreators.placeNewArmies(0, 3), STATES.BATTLING],
    [actionCreators.endAttack(), STATES.FORTIFYING],
    [actionCreators.endTurn(), STATES.PLACING_NEW_ARMIES],
    // TODO - battle
    // TODO - roll dice
    // TODO - foritify
  ];

  actionsAndExpectations.reduce((state, [action, expectedStateKey, currentPlayerIndex]) => {
    const nextState = stateMachine.reduce(state, action);
    expect(nextState.stateKey).toEqual(expectedStateKey);
    if (Number.isInteger(currentPlayerIndex)) {
      expect(nextState.currentPlayerIndex).toEqual(currentPlayerIndex);
    }
    return nextState;
  }, stateMachine.reduce());
});

test('reducer ignores invalid actions', () => {
  const actionsAndExpectations = [
    [actionCreators.startMatch(matchConfig.minPlayers - 1), STATES.INITIALIZING],
    [actionCreators.startMatch(matchConfig.maxPlayers + 1), STATES.INITIALIZING],
  ];

  actionsAndExpectations.reduce((state, [action, expectedStateKey]) => {
    const nextState = stateMachine.reduce(state, action);
    expect(nextState.stateKey).toEqual(expectedStateKey);
    return nextState;
  }, stateMachine.reduce());
});
