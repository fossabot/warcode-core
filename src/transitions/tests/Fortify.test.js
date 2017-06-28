// @flow
import expect from 'expect';
import { ACTIONS, STATES } from '../../constants';
import Fortify from '../Fortify';
import type TransitionType from '../TransitionType';
import parseMatchConfig from '../../MatchConfig';
import actionCreators from '../../actionCreators';
import testConfig from './config.json';

const matchConfig = parseMatchConfig(testConfig);
const matchExtendedState = {
  stateKey: STATES.BATTLING,
  currentPlayerIndex: 0,
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
  players: [
    {
      undeployedArmies: 0,
    },
    {
      undeployedArmies: 0,
    },
  ],
};

test('guard checks capture parameters', () => {
  const transition: TransitionType = new Fortify(matchConfig, matchExtendedState, ACTIONS.FORTIFY);
  const actions = [
    [actionCreators.fortify(1, 2, 1), true],
    [actionCreators.fortify(1, 2, 0), false],
    [actionCreators.fortify(1, 2, 6), false],
    [actionCreators.fortify(2, 1, 1), true],
    [actionCreators.fortify(0, 1, 1), false],
    [actionCreators.fortify(1, 0, 1), false],
  ];
  actions.forEach(([action, expected]) => {
    expect(transition.guard(action)).toEqual(expected);
  });
});

test('reduce updates state', () => {
  const transition: TransitionType = new Fortify(matchConfig, matchExtendedState, ACTIONS.FORTIFY);
  const armiesToMove = 3;
  const from = 1;
  const to = 2;
  const action = actionCreators.fortify(from, to, armiesToMove);
  const n = transition.reduce(action);
  const territories = matchExtendedState.territories;

  expect(n.territories[from].armies).toBe(territories[from].armies - armiesToMove);
  expect(n.territories[to].armies).toBe(territories[to].armies + armiesToMove);
});
