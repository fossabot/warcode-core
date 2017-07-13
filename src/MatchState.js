// @flow

/**
 * Game state including who is the current player, the armies on each territory,
 * and the cards each player holds.
 *
 * Flat data structure containing mostly integers representing counts and indices.
 *
 * @property state - the state of the game, such as "Battling"
 * @property territories - array with an entry for each territory on the board
 * @property territories[].owner - index of player occupying the territory
 * @property territories[].armies - number of armies occupying the territory
 * @property cardOwner - array of player indicies, indicating who holds the card
 * @property playersUndeployedArmies - number of undeployed armies held by each player
 * @property trades - number of sets of cards traded by all players
 * @property captured - number of territories captured by player this turn
 * @property activeBattle - info about the current battle
 * @property activeBattle.attackingTerritory - index of the currrent attacking territory
 * @property activeBattle.defendingTerritory - index of the currrent defending territory
 * @property activeBattle.attackingDiceCount - number of dice rolled by attacker
 * @property currentPlayer - index of the current player
 */
export type MatchState = {
  state: string,
  territories: Array<{
    owner: ?number,
    armies: number,
  }>,
  cardOwner: number[],
  playersUndeployedArmies: number[],
  trades: number,
  captured: number,
  activeBattle: ?{
    attackingTerritory: number,
    defendingTerritory: number,
    attackingDiceCount: number,
  },
  currentPlayer: number,
};
