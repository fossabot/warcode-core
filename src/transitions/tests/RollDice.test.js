// @flow
import expect from 'expect';
import { STATES } from '../../constants';
import RollDice from '../RollDice';
import TransitionGuarded from '../TransitionGuarded';
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
      owner: 1,
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
  activeBattle: {
    attackingTerritoryIndex: 1,
    defendingTerritoryIndex: 0,
    attackingDiceCount: 3,
  },
};

test('guard checks player and territory', () => {
  const transition: TransitionGuarded = new RollDice(matchConfig, matchExtendedState);
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
  const { attackingTerritoryIndex, defendingTerritoryIndex } = matchExtendedState.activeBattle;
  const transition: TransitionGuarded = new RollDice(matchConfig, matchExtendedState);
  const action = actionCreators.rollDice([1, 3, 4], [2, 4]);
  const n = transition.reduce(action);
  const attackingArmies = matchExtendedState.territories[attackingTerritoryIndex].armies;
  const defendingArmies = matchExtendedState.territories[defendingTerritoryIndex].armies;

  expect(n.activeBattle).toInclude(matchExtendedState.activeBattle);
  expect(n.territories[attackingTerritoryIndex].armies).toBe(attackingArmies - 1);
  expect(n.territories[defendingTerritoryIndex].armies).toBe(defendingArmies - 1);
});
