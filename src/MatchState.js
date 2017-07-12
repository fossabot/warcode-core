// @flow

/**
 * @property territories - array with an entry for each territory on the board
 * @property territories[].owner - index of player occupying the territory
 * @property territories[].armies - number of armies occupying the territory
 * @property cardOwner - array with an entry for each card and value representing
 *   the index of the player holding it
 * @property tradeCount - the number of sets of cards traded by all players
 * @property capturedTerritories - number of territories captured by player this turn
 */
export type MatchState = {
  state: string,
  territories: Array<{
    owner: ?number,
    armies: number,
  }>,
  cardOwner: number[],
  playersUndeployedArmies: number[],
  tradeCount: number,
  capturedTerritories: number,
  activeBattle: ?{
    attackingTerritory: number,
    defendingTerritory: number,
    attackingDiceCount: number,
  },
  currentPlayer: number,
};
