// @flow
import expect from 'expect';
import type { MatchConfig } from '../../MatchConfig';
import type { MatchState } from '../../MatchState';
import { ACTIONS, STATES } from '../../constants';
import EndTrade from '../EndTrade';
import type TransitionType from '../../TransitionType';
import parseMatchConfig from '../../MatchConfig';
import actionCreators from '../../actionCreators';
import testConfig from './config.json';

const config: MatchConfig = parseMatchConfig(testConfig);
const currentPlayer = 0;
const matchExtendedState: MatchState = {
  state: STATES.BATTLING,
  currentPlayer,
  territories: [
    {
      owner: 1,
      armies: 3,
    },
    {
      owner: 0,
      armies: 6,
    },
    {
      owner: 0,
      armies: 3,
    },
  ],
  playersUndeployedArmies: [0, 0],
  cardOwner: Array(5).fill(currentPlayer),
  capturedTerritories: 0,
  tradeCount: 0,
  activeBattle: undefined,
};

test('guard checks card count', () => {
  const transition: TransitionType = EndTrade(config, matchExtendedState, ACTIONS.END_TRADE);
  const action = actionCreators.endTrade();
  expect(transition.guard(action)).toEqual(false);
});

test('reduce updates state', () => {
  const transition: TransitionType = EndTrade(config, matchExtendedState, ACTIONS.END_TRADE);
  const action = actionCreators.endTrade();
  const n: MatchState = { ...matchExtendedState, ...transition.reduce(action) };

  expect(n.state).toBe(STATES.BATTLING);
});
