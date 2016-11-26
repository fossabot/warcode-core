//@flow
export type MatchState = {
  territories: Array<{
    owner: number,
    armies: number
  }>,
  cardOwner: number[],
  players: Array<{
    undeployedArmies: number
  }>,
  currentPlayerIndex: ?number,
  tradeCount: number,
  capturedTerritories: number,
  activeBattle: ?{
    attackingTerritoryIndex: number,
    defendingTerritoryIndex: number,
    attackingDiceCount: number
  },
  currentPlayerIndex: number
};
