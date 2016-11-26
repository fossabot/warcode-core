import {ACTIONS, STATES, PSEUDOSTATES} from '../../constants';
import TradeCards from '../TradeCards';
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
  cardOwner: Array(6).fill(currentPlayerIndex)
};

test('guard checks capture parameters', () => {
  const transition: TransitionGuarded = new TradeCards(matchConfig, matchExtendedState);
  const actions = [
    [actionCreators.tradeCards(0, 1, 2), true],
    [actionCreators.tradeCards(0, 1, 4), true],
    [actionCreators.tradeCards(4, 1, 5), true],
    [actionCreators.tradeCards(-1, 0, 2), false],
    [actionCreators.tradeCards(0, 1, 10), false],
    [actionCreators.tradeCards(0, 0, 2), false],
    [actionCreators.tradeCards(0, 2, 3), false]
  ];
  actions.forEach(([action, expected]) => {
    expect(transition.guard(action)).toEqual(expected);
  });
});

// test('reduce updates state', () => {
//   const transition: TransitionGuarded = new Fortify(matchConfig, matchExtendedState);
//   const armiesToMove = 3;
//   const from = 1;
//   const to = 2;
//   const action = actionCreators.fortify(from, to, armiesToMove);
//   const n = transition.reduce(action);
//
//   expect(n.territories[from].armies).toBe(matchExtendedState.territories[from].armies - armiesToMove);
//   expect(n.territories[to].armies).toBe(matchExtendedState.territories[to].armies + armiesToMove);
// });
