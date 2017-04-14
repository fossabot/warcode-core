import expect from 'expect';
import { STATES } from '../../constants';
import SelectFirstPlayer from '../SelectFirstPlayer';
import TransitionGuarded from '../TransitionGuarded';
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
    const transition: TransitionGuarded = new SelectFirstPlayer(matchConfig, matchExtendedState);
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
  const transition: TransitionGuarded = new SelectFirstPlayer(matchConfig, matchExtendedState);
  const firstPlayerIndex = 0;
  const action = actionCreators.selectFirstPlayer(firstPlayerIndex);
  const n = transition.reduce(action);

  expect(n.currentPlayerIndex).toBe(firstPlayerIndex);
});
