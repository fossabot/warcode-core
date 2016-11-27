import {ACTIONS, STATES, PSEUDOSTATES} from '../../constants';
import DrawRandomCard from '../DrawRandomCard';
import TransitionGuarded from '../TransitionGuarded';
import {parseMatchConfig} from '../../MatchConfig';
import actionCreators from '../../actionCreators';
import testConfig from './config.json';
import expect from 'expect';

const matchConfig = parseMatchConfig(testConfig);
const currentPlayerIndex = 0;
const matchExtendedState = {
  stateKey: STATES.BATTLING,
  currentPlayerIndex: currentPlayerIndex,
  territories: [{
    owner: 1,
    armies: 3
  }, {
    owner: 0,
    armies: 6
  }, {
    owner: 0,
    armies: 3
  }],
  players: [{
    undeployedArmies: 0
  }, {
    undeployedArmies: 0
  }],
  cardOwner: Array(6).fill(undefined)
};

test('guard checks capture parameters', () => {
  const transition: TransitionGuarded = new DrawRandomCard(matchConfig, matchExtendedState);
  const actions = [
    [actionCreators.drawRandomCard(-1), false],
    [actionCreators.drawRandomCard(0), true],
    [actionCreators.drawRandomCard(1), true],
    [actionCreators.drawRandomCard(2), true],
    [actionCreators.drawRandomCard(3), true],
    [actionCreators.drawRandomCard(4), true],
    [actionCreators.drawRandomCard(5), true],
    [actionCreators.drawRandomCard(6), false]
  ];
  actions.forEach(([action, expected]) => {
    expect(transition.guard(action)).toEqual(expected);
  });
});

test('reduce updates state', () => {
  const transition: TransitionGuarded = new DrawRandomCard(matchConfig, matchExtendedState);
  const cardIndex = 1;
  const action = actionCreators.drawRandomCard(cardIndex);
  const n = transition.reduce(action);

  expect(n.cardOwner[cardIndex]).toBe(matchExtendedState.currentPlayerIndex);
  expect(n.cardOwner[0]).toBe(undefined);
});
