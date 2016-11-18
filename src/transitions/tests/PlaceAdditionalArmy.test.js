import {ACTIONS, STATES, PSEUDOSTATES} from '../../constants';
import PlaceAdditionalArmy from '../PlaceAdditionalArmy';
import TransitionGuarded from '../TransitionGuarded';
import MatchConfig from '../../MatchConfig';
import actionCreators from '../../actionCreators';
import expect from 'expect';

const matchConfig = new MatchConfig();
const matchExtendedState = {
  stateKey: STATES.PLACING_ADDITIONAL_ARMY,
  currentPlayerIndex: 0,
  territories: [{
    owner: undefined,
    armies: 0
  }, {
    owner: 0,
    armies: 1
  }, {
    owner: 1,
    armies: 1
  }],
  players: [{
    undeployedArmies: 1
  }, {
    undeployedArmies: 0
  }]
};

test('guard validates player and territory', () => {
  const tryValue = (territoryIndex) => {
    const transition: TransitionGuarded = new PlaceAdditionalArmy(matchConfig, matchExtendedState);
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
  const transition: TransitionGuarded = new PlaceAdditionalArmy(matchConfig, matchExtendedState);
  const action = actionCreators.placeAdditionalArmy(territoryIndex);
  const n = transition.reduce(action);

  expect(n.territories[territoryIndex].armies)
    .toBe(matchExtendedState.territories[territoryIndex].armies + 1);
  expect(n.players[matchExtendedState.currentPlayerIndex].undeployedArmies)
    .toBe(matchExtendedState.players[matchExtendedState.currentPlayerIndex].undeployedArmies - 1);
  expect(n.players[1].undeployedArmies)
    .toBe(matchExtendedState.players[1].undeployedArmies);
});
