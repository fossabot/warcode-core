// @flow
import expect from 'expect';
import { ACTIONS, STATES } from '../../constants';
import PlaceNewArmies from '../PlaceNewArmies';
import type TransitionType from '../../TransitionType';
import parseMatchConfig from '../../MatchConfig';
import actionCreators from '../../actionCreators';

const config = parseMatchConfig();
const matchExtendedState = {
  state: STATES.PLACING_NEW_ARMIES,
  currentPlayer: 0,
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
  playersUndeployedArmies: [3, 0],
};

test('guard checks player and territory', () => {
  const tryValue = territory => {
    const transition: TransitionType = PlaceNewArmies(
      config,
      matchExtendedState,
      ACTIONS.PLACE_NEW_ARMIES
    );
    const action = actionCreators.placeNewArmies(territory, 3);
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
  const territory = 0;
  const armies = 3;
  const transition: TransitionType = PlaceNewArmies(
    config,
    matchExtendedState,
    ACTIONS.PLACE_NEW_ARMIES
  );
  const action = actionCreators.placeNewArmies(territory, armies);
  const n = transition.reduce(action);
  const currentPlayer = matchExtendedState.currentPlayer;

  expect(n.territories[territory].armies).toBe(
    matchExtendedState.territories[territory].armies + armies
  );
  expect(n.playersUndeployedArmies[currentPlayer]).toBe(
    matchExtendedState.playersUndeployedArmies[currentPlayer] - armies
  );
  expect(n.playersUndeployedArmies[1]).toBe(matchExtendedState.playersUndeployedArmies[1]);
});
