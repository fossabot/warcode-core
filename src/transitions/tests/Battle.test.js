import expect from 'expect';
import { STATES } from '../../constants';
import Battle from '../Battle';
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
};

test('guard checks player and territory', () => {
  const transition: TransitionGuarded = new Battle(matchConfig, matchExtendedState);

  [
    [actionCreators.battle(1, 0, 3), true],
    [actionCreators.battle(1, 0, 4), false],
    [actionCreators.battle(0, 1, 3), false],
    [actionCreators.battle(1, 2, 0), false],
    [actionCreators.battle(1, 2, 1), true],
    [actionCreators.battle(1, 2, 2), true],
    [actionCreators.battle(1, 2, 3), true],
    [actionCreators.battle(1, 2, 4), false],
  ].forEach(([action, expected]) => expect(transition.guard(action)).toEqual(expected));
});

test('reduce updates state', () => {
  const attackingTerritoryIndex = 1;
  const defendingTerritoryIndex = 0;
  const attackingDiceCount = 3;
  const transition: TransitionGuarded = new Battle(matchConfig, matchExtendedState);
  const action = actionCreators.battle(
    attackingTerritoryIndex,
    defendingTerritoryIndex,
    attackingDiceCount
  );
  const n = transition.reduce(action);

  expect(n.activeBattle)
    .toExist()
    .toInclude({ attackingTerritoryIndex, defendingTerritoryIndex, attackingDiceCount });
  expect(n.territories[attackingTerritoryIndex]).toInclude(
    matchExtendedState.territories[attackingTerritoryIndex]
  );
  expect(n.territories[defendingTerritoryIndex]).toInclude(
    matchExtendedState.territories[defendingTerritoryIndex]
  );
});
