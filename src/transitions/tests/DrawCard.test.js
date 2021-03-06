// @flow
import expect from 'expect';
import { STATES } from '../../constants';
import DrawRandomCard from '../DrawRandomCard';
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
  cardOwner: Array(6).fill(undefined),
};

test('guard checks capture parameters', () => {
  const transition: TransitionType = DrawRandomCard(config, matchExtendedState);
  const actions = [
    [actionCreators.drawRandomCard(-1), false],
    [actionCreators.drawRandomCard(0), true],
    [actionCreators.drawRandomCard(1), true],
    [actionCreators.drawRandomCard(2), true],
    [actionCreators.drawRandomCard(3), true],
    [actionCreators.drawRandomCard(4), true],
    [actionCreators.drawRandomCard(5), true],
    [actionCreators.drawRandomCard(6), false],
  ];
  actions.forEach(([action, expected]) => {
    expect(transition.guard(action)).toEqual(expected);
  });
});

test('reduce updates state', () => {
  const transition: TransitionType = DrawRandomCard(config, matchExtendedState);
  const card = 1;
  const action = actionCreators.drawRandomCard(card);
  const n = transition.reduce(action);

  expect(n.cardOwner[card]).toBe(matchExtendedState.currentPlayer);
  expect(n.cardOwner[0]).toBe(undefined);
});
