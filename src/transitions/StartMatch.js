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
  guard: ({ players }) =>
    Number.isInteger(players) && players >= minPlayers && players <= maxPlayers,
  reduce: ({ players }) => ({
    territories: Array(territories.length).fill({
      owner: undefined,
      armies: 0,
    }),
    cardOwner: Array(cards.length).fill(undefined),
    playersUndeployedArmies: Array(players).fill(startingArmiesByPlayers[players]),
    currentPlayer: -1,
    trades: 0,
    captured: 0,
    activeBattle: undefined,
    state: STATES.INITIALIZING,
  }),
});
