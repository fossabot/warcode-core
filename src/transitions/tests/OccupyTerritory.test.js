// @flow
import expect from 'expect';
import { ACTIONS, STATES } from '../../constants';
import OccupyTerritory from '../OccupyTerritory';
import type TransitionType from '../../TransitionType';
import parseMatchConfig from '../../MatchConfig';
import actionCreators from '../../actionCreators';

const config = parseMatchConfig();
const matchExtendedState = {
  stateKey: STATES.OCCUPYING,
  currentPlayerIndex: 0,
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
  const tryValue = territoryIndex => {
    const transition: TransitionType = OccupyTerritory(
      config,
      matchExtendedState,
      ACTIONS.OCCUPY_TERRITORY
    );
    const action = actionCreators.occupyTerritory(territoryIndex);
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
  const territoryIndex = 0;
  const transition: TransitionType = OccupyTerritory(
    config,
    matchExtendedState,
    ACTIONS.OCCUPY_TERRITORY
  );
  const action = actionCreators.occupyTerritory(territoryIndex);
  const n = transition.reduce(action);
  // console.log('matchExtendedState', JSON.stringify(matchExtendedState));
  // console.log('n', JSON.stringify(n));

  expect(n.territories[territoryIndex].owner).toBe(matchExtendedState.currentPlayerIndex);
  expect(n.territories[territoryIndex].armies).toBe(1);
  expect(n.playersUndeployedArmies[matchExtendedState.currentPlayerIndex]).toBe(
    matchExtendedState.playersUndeployedArmies[matchExtendedState.currentPlayerIndex] - 1
  );
  expect(n.playersUndeployedArmies[1]).toBe(matchExtendedState.playersUndeployedArmies[1]);
});
