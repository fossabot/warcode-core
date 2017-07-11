// @flow
import type { MatchConfig } from '../MatchConfig';
import type { TransitionType } from '../TransitionType';
import { STATES } from '../constants';

export default ({
  minPlayers,
  maxPlayers,
  territories,
  cards,
  startingArmiesByPlayers,
}: MatchConfig): TransitionType => ({
  guard: ({ playerCount }) =>
    Number.isInteger(playerCount) && playerCount >= minPlayers && playerCount <= maxPlayers,
  reduce: ({ playerCount }) => ({
    territories: Array(territories.length).fill({
      owner: undefined,
      armies: 0,
    }),
    cardOwner: Array(cards.length).fill(undefined),
    playersUndeployedArmies: Array(playerCount).fill(startingArmiesByPlayers[playerCount]),
    currentPlayerIndex: -1,
    tradeCount: 0,
    capturedTerritories: 0,
    activeBattle: undefined,
    stateKey: STATES.INITIALIZING,
  }),
});
