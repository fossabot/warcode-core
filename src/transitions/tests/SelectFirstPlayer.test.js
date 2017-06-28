// @flow
import expect from 'expect';
import { ACTIONS, STATES } from '../../constants';
import SelectFirstPlayer from '../SelectFirstPlayer';
import type TransitionType from '../TransitionType';
import parseMatchConfig from '../../MatchConfig';
import actionCreators from '../../actionCreators';

const matchConfig = parseMatchConfig();
const matchExtendedState = {
  stateKey: STATES.SELECT_FIRST_PLAYER,
  players: [
    {
      undeployedArmies: 1,
    },
    {
      undeployedArmies: 0,
    },
  ],
};

test('guard validates first player index', () => {
  const tryValue = firstPlayerIndex => {
    const transition: TransitionType = new SelectFirstPlayer(
      matchConfig,
      matchExtendedState,
      ACTIONS.SELECT_FIRST_PLAYER
    );
    const action = actionCreators.selectFirstPlayer(firstPlayerIndex);
    return transition.guard(action);
  };

  const maxPlayerIndex = matchConfig.maxPlayers - matchConfig.minPlayers - 1;

  expect(tryValue(undefined)).toBe(false);
  expect(tryValue(-1)).toBe(false);
  expect(tryValue(0)).toBe(true);
  expect(tryValue(maxPlayerIndex - 1)).toBe(true);
  expect(tryValue(maxPlayerIndex)).toBe(false);
});

test('reduce creates valid initial state', () => {
  const transition: TransitionType = new SelectFirstPlayer(
    matchConfig,
    matchExtendedState,
    ACTIONS.SELECT_FIRST_PLAYER
  );
  const firstPlayerIndex = 0;
  const action = actionCreators.selectFirstPlayer(firstPlayerIndex);
  const n = transition.reduce(action);

  expect(n.currentPlayerIndex).toBe(firstPlayerIndex);
});
