import expect from 'expect';
import { STATES } from '../constants';
import actionCreators from '../actionCreators';
import StateMachine from '../StateMachine';
import testConfig from './config.json';
import parseMatchConfig from '../MatchConfig';

const matchConfig = parseMatchConfig(testConfig);
const stateMachine = new StateMachine(matchConfig);

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

  actionsAndExpectations.reduce((state, [action, expectedStateKey, currentPlayer]) => {
    const nextState = stateMachine.reduce(state, action);
    expect(nextState.state).toEqual(expectedStateKey);
    if (Number.isInteger(currentPlayer)) {
      expect(nextState.currentPlayer).toEqual(currentPlayer);
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
    expect(nextState.state).toEqual(expectedStateKey);
    return nextState;
  }, stateMachine.reduce());
});
