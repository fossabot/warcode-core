import {ACTIONS, STATES, PSEUDOSTATES} from '../../constants';
import EndTrade from '../EndTrade';
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
  cardOwner: Array(5).fill(currentPlayerIndex)
};

test('guard checks card count', () => {
  const transition: TransitionGuarded = new EndTrade(matchConfig, matchExtendedState);
  const action = actionCreators.endTrade();
  expect(transition.guard(action)).toEqual(false);
});

test('reduce updates state', () => {
  const transition: TransitionGuarded = new EndTrade(matchConfig, matchExtendedState);
  const action = actionCreators.endTrade();
  const n = transition.reduce(action);

  expect(n.stateKey).toBe(STATES.BATTLING);
});
