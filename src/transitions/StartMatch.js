// @flow
import type { MatchConfig } from '../MatchConfig';
import { ACTIONS, STATES } from '../constants';
import TransitionGuarded from './TransitionGuarded';

/**
 * Start match
 *
 * The number of players determines the number of armies each player receive.
 * The traditional rules award each player the number shown in this table.
 * However, this may vary based on the match settings.
 *
 * | Players | Armies |
 * |---------|--------|
 * | 3       | 35     |
 * | 4       | 30     |
 * | 5       | 25     |
 * | 6       | 20     |
 *
 * @example
 * const initialMatchState = reduce();
 * // initialMatchState === { stateID: STATES.INITIALIZING, ... }
 * getPrompt(initialMatchState, initialMatchState);
 * // returns { type: ACTIONS.START_MATCH, minPlayers: 3, maxPlayers: 6 }
 * const action = startMatch(5);
 * // action === { type: ACTIONS.START_MATCH, playerCount: 5 }
 * const newMatchState = reduce(initialMatchState, action);
 * // newMatchState === { stateID: STATES.SELECTING_FIRST_PLAYER, ... }
 *
 */
export default function(matchConfig: MatchConfig): TransitionGuarded {
  const { minPlayers, maxPlayers, territories, cards, startingArmiesByPlayers } = matchConfig;

  const guard = ({ playerCount }) =>
    Number.isInteger(playerCount) && playerCount >= minPlayers && playerCount <= maxPlayers;

  const reduce = ({ playerCount }) => ({
    territories: Array(territories.length).fill({
      owner: undefined,
      armies: 0,
    }),
    cardOwner: Array(cards.length).fill(undefined),
    players: Array(playerCount).fill({
      undeployedArmies: startingArmiesByPlayers[playerCount],
    }),
    currentPlayerIndex: -1,
    tradeCount: 0,
    capturedTerritories: 0,
    activeBattle: undefined,
    stateKey: STATES.INITIALIZING,
  });

  return new TransitionGuarded(ACTIONS.START_MATCH, guard, reduce);
}
