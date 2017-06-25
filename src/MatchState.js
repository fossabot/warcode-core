// @flow
export type MatchState = {
  stateKey: string,
  territories: Array<{
    owner: number,
    armies: number,
  }>,
  cardOwner: number[],
  players: Array<{
    undeployedArmies: number,
  }>,
  currentPlayerIndex: ?number,
  tradeCount: number,
  // number of territories captured by player this turn
  capturedTerritories: number,
  activeBattle: ?{
    attackingTerritoryIndex: number,
    defendingTerritoryIndex: number,
    attackingDiceCount: number,
  },
  currentPlayerIndex: number,
};
