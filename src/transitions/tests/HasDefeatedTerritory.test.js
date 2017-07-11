import expect from 'expect';
import HasDefeatedTerritory from '../HasDefeatedTerritory';
import parseMatchConfig from '../../MatchConfig';
import actionCreators from '../../actionCreators';
import testConfig from './config.json';
import { STATES } from '../../constants';

const config = parseMatchConfig(testConfig);
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
  playersUndeployedArmies: [0, 0],
};
// TODO - try handling of incorrect action with deployed armies
// TODO - try 0 undeployed armiesS
// TODO - try correct type and stateS

test('guard checks action', () => {
  const transition = new HasDefeatedTerritory(config, matchExtendedState);
  const action = actionCreators.startMatch(5);
  expect(transition.guard(action)).toEqual(false);
});

test('guard checks that player has deployed all their armies', () => {
  const transition = new HasDefeatedTerritory(config, matchExtendedState);
  const action = actionCreators.rollDice(2, 2);
  expect(transition.guard(action)).toEqual(false);
});
