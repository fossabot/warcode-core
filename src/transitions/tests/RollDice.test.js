// @flow
import expect from 'expect';
import { ACTIONS, STATES } from '../../constants';
import RollDice from '../RollDice';
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

test('guard checks player and territory', () => {
  const transition: TransitionType = RollDice(config, matchExtendedState, ACTIONS.ROLL_DICE);
  const actions = [
    [actionCreators.rollDice([1, 2, 3], [1]), true],
    [actionCreators.rollDice([1, 2, 3], [1, 2]), true],
    [actionCreators.rollDice([0, 2, 3], [1, 2]), false],
    [actionCreators.rollDice([1, 2, 7], [1, 2]), false],
    [actionCreators.rollDice([1, 2, 3], [0, 2]), false],
    [actionCreators.rollDice([1, 2, 3], [1, 7]), false],
    [actionCreators.rollDice([1, 2, 3], [1, 2, 3]), false],
    [actionCreators.rollDice([1, 2, 3, 4], [1, 2]), false],
    [actionCreators.rollDice([1, 2], [1, 2]), false],
  ];
  actions.forEach(([action, expected]) => {
    expect(transition.guard(action)).toEqual(expected);
  });
});

test('reduce updates state', () => {
  const { attackingTerritory, defendingTerritory } = matchExtendedState.activeBattle;
  const transition: TransitionType = RollDice(config, matchExtendedState, ACTIONS.ROLL_DICE);
  const action = actionCreators.rollDice([1, 3, 4], [2, 4]);
  const n = { ...matchExtendedState, ...transition.reduce(action) };
  const attackingArmies = matchExtendedState.territories[attackingTerritory].armies;
  const defendingArmies = matchExtendedState.territories[defendingTerritory].armies;

  expect(n.activeBattle).toInclude(matchExtendedState.activeBattle);
  expect(n.territories[attackingTerritory].armies).toBe(attackingArmies - 1);
  expect(n.territories[defendingTerritory].armies).toBe(defendingArmies - 1);
});
