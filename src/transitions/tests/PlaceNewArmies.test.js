// @flow
import expect from 'expect';
import { ACTIONS, STATES } from '../../constants';
import PlaceNewArmies from '../PlaceNewArmies';
import type TransitionType from '../TransitionType';
import parseMatchConfig from '../../MatchConfig';
import actionCreators from '../../actionCreators';

const matchConfig = parseMatchConfig();
const matchExtendedState = {
  stateKey: STATES.PLACING_NEW_ARMIES,
  currentPlayerIndex: 0,
  territories: [
    {
      owner: 1,
      armies: 1,
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
  players: [
    {
      undeployedArmies: 3,
    },
    {
      undeployedArmies: 0,
    },
  ],
};

test('guard checks player and territory', () => {
  const tryValue = territoryIndex => {
    const transition: TransitionType = PlaceNewArmies(
      matchConfig,
      matchExtendedState,
      ACTIONS.PLACE_NEW_ARMIES
    );
    const action = actionCreators.placeNewArmies(territoryIndex, 3);
    return transition.guard(action);
  };

  expect(tryValue(undefined)).toBe(false, 'must be in range');
  expect(tryValue(-1)).toBe(false, 'must be in range');
  expect(tryValue(0)).toBe(false, 'must be occupied by current player');
  expect(tryValue(1)).toBe(true);
  expect(tryValue(2)).toBe(false, 'must be occupied by current player');
  expect(tryValue(3)).toBe(false, 'must be in range');
});

test('reduce updates player and territory', () => {
  const territoryIndex = 0;
  const armies = 3;
  const transition: TransitionType = PlaceNewArmies(
    matchConfig,
    matchExtendedState,
    ACTIONS.PLACE_NEW_ARMIES
  );
  const action = actionCreators.placeNewArmies(territoryIndex, armies);
  const n = transition.reduce(action);
  const currentPlayerIndex = matchExtendedState.currentPlayerIndex;

  expect(n.territories[territoryIndex].armies).toBe(
    matchExtendedState.territories[territoryIndex].armies + armies
  );
  expect(n.players[currentPlayerIndex].undeployedArmies).toBe(
    matchExtendedState.players[currentPlayerIndex].undeployedArmies - armies
  );
  expect(n.players[1].undeployedArmies).toBe(matchExtendedState.players[1].undeployedArmies);
});
