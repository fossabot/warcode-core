// @flow
import expect from 'expect';
import { ACTIONS, STATES } from '../../constants';
import PlaceAdditionalArmy from '../PlaceAdditionalArmy';
import type TransitionType from '../../TransitionType';
import parseMatchConfig from '../../MatchConfig';
import actionCreators from '../../actionCreators';

const config = parseMatchConfig();
const matchExtendedState = {
  state: STATES.PLACING_ADDITIONAL_ARMY,
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

test('guard validates player and territory', () => {
  const tryValue = territory => {
    const transition: TransitionType = PlaceAdditionalArmy(
      config,
      matchExtendedState,
      ACTIONS.PLACE_ADDITIONAL_ARMY
    );
    const action = actionCreators.placeAdditionalArmy(territory);
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
  const transition: TransitionType = PlaceAdditionalArmy(
    config,
    matchExtendedState,
    ACTIONS.PLACE_ADDITIONAL_ARMY
  );
  const action = actionCreators.placeAdditionalArmy(territory);
  const n = transition.reduce(action);

  expect(n.territories[territory].armies).toBe(
    matchExtendedState.territories[territory].armies + 1
  );
  expect(n.playersUndeployedArmies[matchExtendedState.currentPlayer]).toBe(
    matchExtendedState.playersUndeployedArmies[matchExtendedState.currentPlayer] - 1
  );
  expect(n.playersUndeployedArmies[1]).toBe(matchExtendedState.playersUndeployedArmies[1]);
});
