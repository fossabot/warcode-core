// @flow
import expect from 'expect';
import { ACTIONS, STATES } from '../../constants';
import TradeCards from '../TradeCards';
import type TransitionType from '../../TransitionType';
import parseMatchConfig from '../../MatchConfig';
import actionCreators from '../../actionCreators';
import testConfig from './config.json';

const config = parseMatchConfig(testConfig);
const currentPlayer = 0;
const matchExtendedState = {
  state: STATES.BATTLING,
  currentPlayer,
  territories: [
    {
      owner: 1,
      armies: 3,
    },
    {
      owner: 0,
      armies: 6,
    },
    {
      owner: 0,
      armies: 3,
    },
  ],
  playersUndeployedArmies: [0, 0],
  cardOwner: Array(6).fill(currentPlayer),
};

test('guard checks capture parameters', () => {
  const transition: TransitionType = TradeCards(config, matchExtendedState, ACTIONS.TRADE_CARDS);
  const actions = [
    [actionCreators.tradeCards(0, 1, 2), true],
    [actionCreators.tradeCards(0, 1, 4), true],
    [actionCreators.tradeCards(4, 1, 5), true],
    [actionCreators.tradeCards(-1, 0, 2), false],
    [actionCreators.tradeCards(0, 1, 10), false],
    [actionCreators.tradeCards(0, 0, 2), false],
    [actionCreators.tradeCards(0, 2, 3), false],
  ];
  actions.forEach(([action, expected]) => {
    expect(transition.guard(action)).toEqual(expected);
  });
});

test('reduce updates state', () => {
  const transition: TransitionType = TradeCards(config, matchExtendedState, ACTIONS.TRADE_CARDS);
  const action = actionCreators.tradeCards(0, 1, 2);
  const n = transition.reduce(action);

  expect(n.cardOwner[0]).toBe(null);
  expect(n.cardOwner[1]).toBe(null);
  expect(n.cardOwner[2]).toBe(null);
  expect(n.cardOwner[3]).toBe(matchExtendedState.currentPlayer);
});
