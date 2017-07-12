// @flow
import expect from 'expect';
import { ACTIONS, STATES } from '../../constants';
import Capture from '../Capture';
import type TransitionType from '../../TransitionType';
import parseMatchConfig from '../../MatchConfig';
import actionCreators from '../../actionCreators';
import testConfig from './config.json';

const config = parseMatchConfig(testConfig);
const matchExtendedState = {
  state: STATES.BATTLING,
  currentPlayer: 0,
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
      owner: 1,
      armies: 3,
    },
  ],
  playersUndeployedArmies: [0, 0],
  activeBattle: {
    attackingTerritory: 1,
    defendingTerritory: 0,
    attackingDiceCount: 3,
  },
};

test('guard checks capture parameters', () => {
  const transition: TransitionType = Capture(config, matchExtendedState, ACTIONS.CAPTURE);
  const actions = [
    [actionCreators.capture(0), false],
    [actionCreators.capture(1), false],
    [actionCreators.capture(2), false],
    [actionCreators.capture(3), true],
    [actionCreators.capture(4), true],
    [actionCreators.capture(5), true],
    [actionCreators.capture(6), false],
  ];
  actions.forEach(([action, expected]) => {
    expect(transition.guard(action)).toEqual(expected);
  });
});

test('reduce updates state', () => {
  const { attackingTerritory, defendingTerritory } = matchExtendedState.activeBattle;
  const transition: TransitionType = Capture(config, matchExtendedState, ACTIONS.CAPTURE);
  const armiesToMove = 3;
  const action = actionCreators.capture(armiesToMove);
  const n = transition.reduce(action);
  const attackingArmies = matchExtendedState.territories[attackingTerritory].armies;

  expect(n.activeBattle).toNotExist();
  expect(n.territories[attackingTerritory].armies).toBe(attackingArmies - armiesToMove);
  expect(n.territories[defendingTerritory].armies).toBe(armiesToMove);
});
