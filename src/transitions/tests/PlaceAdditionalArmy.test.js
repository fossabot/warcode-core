// @flow
import expect from 'expect';
import { ACTIONS, STATES } from '../../constants';
import PlaceAdditionalArmy from '../PlaceAdditionalArmy';
import type TransitionType from '../../TransitionType';
import parseMatchConfig from '../../MatchConfig';
import actionCreators from '../../actionCreators';

const config = parseMatchConfig();
const matchExtendedState = {
  stateKey: STATES.PLACING_ADDITIONAL_ARMY,
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

test('guard validates player and territory', () => {
  const tryValue = territoryIndex => {
    const transition: TransitionType = PlaceAdditionalArmy(
      config,
      matchExtendedState,
      ACTIONS.PLACE_ADDITIONAL_ARMY
    );
    const action = actionCreators.placeAdditionalArmy(territoryIndex);
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
  const transition: TransitionType = PlaceAdditionalArmy(
    config,
    matchExtendedState,
    ACTIONS.PLACE_ADDITIONAL_ARMY
  );
  const action = actionCreators.placeAdditionalArmy(territoryIndex);
  const n = transition.reduce(action);

  expect(n.territories[territoryIndex].armies).toBe(
    matchExtendedState.territories[territoryIndex].armies + 1
  );
  expect(n.playersUndeployedArmies[matchExtendedState.currentPlayerIndex]).toBe(
    matchExtendedState.playersUndeployedArmies[matchExtendedState.currentPlayerIndex] - 1
  );
  expect(n.playersUndeployedArmies[1]).toBe(matchExtendedState.playersUndeployedArmies[1]);
});
