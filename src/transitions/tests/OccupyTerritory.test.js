// @flow
import expect from 'expect';
import { ACTIONS, STATES } from '../../constants';
import OccupyTerritory from '../OccupyTerritory';
import type TransitionType from '../../TransitionType';
import parseMatchConfig from '../../MatchConfig';
import actionCreators from '../../actionCreators';

const config = parseMatchConfig();
const matchExtendedState = {
  state: STATES.OCCUPYING,
  currentPlayer: 0,
  territories: [
    {
      owner: undefined,
      armies: 0,
    },
    {
      owner: 0,
      armies: 1,
    },
    {
      owner: 1,
      armies: 1,
    },
  ],
  playersUndeployedArmies: [1, 0],
};

test('guard validates territory index', () => {
  const tryValue = territory => {
    const transition: TransitionType = OccupyTerritory(
      config,
      matchExtendedState,
      ACTIONS.OCCUPY_TERRITORY
    );
    const action = actionCreators.occupyTerritory(territory);
    return transition.guard(action);
  };

  expect(tryValue(undefined)).toBe(false, 'must be in range');
  expect(tryValue(-1)).toBe(false, 'must be in range');
  expect(tryValue(0)).toBe(true);
  expect(tryValue(1)).toBe(false, 'must be unoccupied');
  expect(tryValue(2)).toBe(false, 'must be unoccupied');
  expect(tryValue(3)).toBe(false, 'must be in range');
});

test('reduce updates player and territory', () => {
  const territory = 0;
  const transition: TransitionType = OccupyTerritory(
    config,
    matchExtendedState,
    ACTIONS.OCCUPY_TERRITORY
  );
  const action = actionCreators.occupyTerritory(territory);
  const n = transition.reduce(action);
  // console.log('matchExtendedState', JSON.stringify(matchExtendedState));
  // console.log('n', JSON.stringify(n));

  expect(n.territories[territory].owner).toBe(matchExtendedState.currentPlayer);
  expect(n.territories[territory].armies).toBe(1);
  expect(n.playersUndeployedArmies[matchExtendedState.currentPlayer]).toBe(
    matchExtendedState.playersUndeployedArmies[matchExtendedState.currentPlayer] - 1
  );
  expect(n.playersUndeployedArmies[1]).toBe(matchExtendedState.playersUndeployedArmies[1]);
});
