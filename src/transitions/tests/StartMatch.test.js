// @flow
import expect from 'expect';
import { ACTIONS, STATES } from '../../constants';
import StartMatch from '../StartMatch';
import type TransitionType from '../../TransitionType';
import parseMatchConfig from '../../MatchConfig';
import actionCreators from '../../actionCreators';

const config = parseMatchConfig();
const matchExtendedState = {
  stateKey: STATES.INITIALIZING,
};

test('guard validates player count', () => {
  const tryValue = playerCount => {
    const transition: TransitionType = StartMatch(config, matchExtendedState, ACTIONS.START_MATCH);
    const action = actionCreators.startMatch(playerCount);
    return transition.guard(action);
  };

  expect(tryValue(undefined)).toBe(false);
  expect(tryValue(config.minPlayers - 1)).toBe(false);
  expect(tryValue(config.maxPlayers + 1)).toBe(false);
  expect(tryValue(config.minPlayers)).toBe(true);
  expect(tryValue(config.maxPlayers)).toBe(true);
});

test('reduce creates valid initial state', () => {
  const playerCount = 5;
  const transtion = new StartMatch(config, matchExtendedState, ACTIONS.START_MATCH);
  const action = actionCreators.startMatch(playerCount);
  const n = transtion.reduce(action);

  expect(n.territories.length).toBe(config.territories.length);
  expect(n.territories[0].owner).toNotExist('territory not unoccupied');
  expect(n.territories[0].armies).toBe(0, 'territory armies should be zero');

  expect(n.cardOwner.length).toBe(config.cards.length, 'card length should match');
  expect(n.cardOwner[0]).toNotExist('card should be unowned');

  expect(n.players.length).toBe(playerCount);
  expect(n.players[0].undeployedArmies).toBe(config.startingArmiesByPlayers[playerCount]);

  expect(n.currentPlayerIndex).toBe(-1);
  expect(n.tradeCount).toBe(0);
  expect(n.capturedTerritories).toBe(0);
});
