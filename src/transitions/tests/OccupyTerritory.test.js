import expect from 'expect';
import { STATES } from '../../constants';
import OccupyTerritory from '../OccupyTerritory';
import TransitionGuarded from '../TransitionGuarded';
import parseMatchConfig from '../../MatchConfig';
import actionCreators from '../../actionCreators';

const matchConfig = parseMatchConfig();
const matchExtendedState = {
  stateKey: STATES.OCCUPYING,
  currentPlayerIndex: 0,
  territories: [{
    owner: undefined,
    armies: 0,
  }, {
    owner: 0,
    armies: 1,
  }, {
    owner: 1,
    armies: 1,
  }],
  players: [{
    undeployedArmies: 1,
  }, {
    undeployedArmies: 0,
  }],
};

test('guard validates territory index', () => {
  const tryValue = (territoryIndex) => {
    const transition: TransitionGuarded = new OccupyTerritory(matchConfig, matchExtendedState);
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
  const transition: TransitionGuarded = new OccupyTerritory(matchConfig, matchExtendedState);
  const action = actionCreators.occupyTerritory(territoryIndex);
  const n = transition.reduce(action);
  // console.log('matchExtendedState', JSON.stringify(matchExtendedState));
  // console.log('n', JSON.stringify(n));

  expect(n.territories[territoryIndex].owner)
    .toBe(matchExtendedState.currentPlayerIndex);
  expect(n.territories[territoryIndex].armies)
    .toBe(1);
  expect(n.players[matchExtendedState.currentPlayerIndex].undeployedArmies)
    .toBe(matchExtendedState.players[matchExtendedState.currentPlayerIndex].undeployedArmies - 1);
  expect(n.players[1].undeployedArmies)
    .toBe(matchExtendedState.players[1].undeployedArmies);
});
