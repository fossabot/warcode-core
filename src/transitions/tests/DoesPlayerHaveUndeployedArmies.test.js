import expect from 'expect';
import DoesPlayerHaveUndeployedArmies from '../DoesPlayerHaveUndeployedArmies';
import parseMatchConfig from '../../MatchConfig';
import actionCreators from '../../actionCreators';
import testConfig from './config.json';
import { STATES } from '../../constants';

const matchConfig = parseMatchConfig(testConfig);
const matchExtendedState = {
  stateKey: STATES.BATTLING,
  currentPlayerIndex: 0,
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
      owner: 1,
      armies: 3,
    },
  ],
  players: [
    {
      undeployedArmies: 0,
    },
    {
      undeployedArmies: 0,
    },
  ],
};
// TODO - try handling of incorrect action with deployed armies
// TODO - try 0 undeployed armiesS
// TODO - try correct type and stateS

test('guard checks state', () => {
  const transition = new DoesPlayerHaveUndeployedArmies(matchConfig, matchExtendedState);
  const action = actionCreators.startMatch(5);
  expect(transition.guard(action)).toEqual(false);
});

test('guard checks that player has deployed all their armies', () => {
  const transition = new DoesPlayerHaveUndeployedArmies(matchConfig, matchExtendedState);
  const action = actionCreators.placeNewArmies(0, 1);
  expect(transition.guard(action)).toEqual(false);
});

test('guard is true when player has undeployed armies', () => {
  const matchExtendedStateCopy = {
    ...matchExtendedState,
    ...{
      players: [{ undeployedArmies: 1 }, { undeployedArmies: 0 }],
    },
  };
  const transition = new DoesPlayerHaveUndeployedArmies(matchConfig, matchExtendedStateCopy);
  const action = actionCreators.placeNewArmies(0, 1);
  expect(transition.guard(action)).toEqual(true);
  expect(transition.reduce(action)).toEqual(matchExtendedStateCopy);
});
