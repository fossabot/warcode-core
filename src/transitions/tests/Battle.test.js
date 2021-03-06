// @flow
import expect from 'expect';
import { ACTIONS, STATES } from '../../constants';
import Battle from '../Battle';
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
};

test('guard checks player and territory', () => {
  const transition: TransitionType = Battle(config, matchExtendedState, ACTIONS.BATTLE);

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
  const attackingTerritory = 1;
  const defendingTerritory = 0;
  const attackingDiceCount = 3;
  const transition: TransitionType = Battle(config, matchExtendedState, ACTIONS.BATTLE);
  const action = actionCreators.battle(attackingTerritory, defendingTerritory, attackingDiceCount);
  const n = { ...matchExtendedState, ...transition.reduce(action) };

  expect(n.activeBattle)
    .toExist()
    .toInclude({ attackingTerritory, defendingTerritory, attackingDiceCount });
  expect(n.territories[attackingTerritory]).toInclude(
    matchExtendedState.territories[attackingTerritory]
  );
  expect(n.territories[defendingTerritory]).toInclude(
    matchExtendedState.territories[defendingTerritory]
  );
});
