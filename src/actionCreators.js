import { ACTIONS } from './constants';

/**
 * Start the match.
 *
 * @param playerCount {number} - Number of players. The match settings determine the minimum and maximum number of players.
 * @return {{ type: string; playerCount; }}
 */
function startMatch(playerCount) {
  return {
    type: ACTIONS.START_MATCH,
    playerCount
  };
}

/**
 * Select player to take first move, similarly to each player rolling a die
 * to begin the game.
 *
 * @param firstPlayerIndex {number} - Index of the first player.
 * @return {{ type: string; firstPlayerIndex; }}
 */
function selectFirstPlayer(firstPlayerIndex) {
  return {
    type: ACTIONS.SELECT_FIRST_PLAYER,
    firstPlayerIndex
  };
}

/**
 * Select territory to occupy.
 *
 * @param territoryIndex {number} - Index of territory to occupy. It must be unoccupied.
 * @return {{ type: string; territoryIndex; }}
 */
function occupyTerritory(territoryIndex) {
  return {
    type: ACTIONS.OCCUPY_TERRITORY,
    territoryIndex
  };
}

/**
 * Select a territory you own to place an additional army.
 *
 * @param territoryIndex {number} - Index of territory to place an additional army. You must occupy it.
 * @return {{ type: string; territoryIndex; } }
 */
function placeAdditionalArmy(territoryIndex) {
  return {
    type: ACTIONS.PLACE_ADDITIONAL_ARMY,
    territoryIndex
  };
}

/**
 * Select three cards to trade for armies.
 *
 * @param i {number}  - Index of first card to trade. This card will receive a territory bonus.
 * @param j {number}  - Index of card to trade
 * @param k {number}  - Index of card to trade
 */
function tradeCards(i, j, k) {
   return {
     type: ACTIONS.TRADE_CARDS,
     i,
     j,
     k
   };
}

/**
 * End trading and begin the attacking phase of the turn.
 * You must continue trading when you hold five or six cards.
 */
function endTrade() {
  return {
    type: ACTIONS.END_TRADE
  };
}

/**
 * Place some undeployed armies on an occupied territory to start the turn
 * @param territoryIndex {number}  - index of territory to place new armies
 * @param armies {number}  - number of armies to place
 */
function placeNewArmies(territoryIndex, armies) {
  return {
    type: ACTIONS.PLACE_NEW_ARMIES,
    territoryIndex,
    armies
  };
}

/**
 * Select a territory to attack, neighboring defending territory, and dice to roll
 * @param attackingTerritoryIndex {number}  - index of attacking territory
 * @param defendingTerritoryIndex {number}  - index of defending territory
 * @param attackingDiceCount {number} - number of dice to be rolled by attacker
 */
function battle(attackingTerritoryIndex, defendingTerritoryIndex, attackingDiceCount) {
  return {
    type: ACTIONS.BATTLE,
    attackingTerritoryIndex,
    defendingTerritoryIndex,
    attackingDiceCount
  };
}

/**
 * Simulate attacker and defender rolling dice.
 * @param attackerDice {Array.number} - dice rolled by attacker
 * @param defenderDice {Array.number} - dice rolled by defender
 */
function rollDice(attackerDice, defenderDice) {
  return {
    type: ACTIONS.ROLL_DICE,
    attackerDice,
    defenderDice
  };
}

/** End attack and begin fortifying */
function endAttack() {
  return {
    type: ACTIONS.END_ATTACK
  };
}

/**
 * Capture the defeated territory by moving armies into it
 * @param armies {number} - number of armies to move
 */
function capture(armies) {
  return {
    type: ACTIONS.CAPTURE,
    armies
  };
}

/**
 * Move armies between two of your adjacent territories before ending your turn.
 *
 * @param fromTerritoryIndex - Index of territory to move armies from. Must be owned by you, have more than one army, and be adjacent to toTerritoryIndex.
 * @param toTerritoryIndex - Index of territory to move armies to. Must be owned by you and adjacent to fromTerritoryIndex.
 * @param armies - Number of armies to move. You must leave one army behind, so the number may between one and the number of the armies on fromTerritoryIndex.
 */
function fortify(fromTerritoryIndex, toTerritoryIndex, armies) {
  return {
    type: ACTIONS.FORTIFY,
    fromTerritoryIndex,
    toTerritoryIndex,
    armies
  }
}

/** End turn without fortifying. */
function endTurn() {
  return {
    type: ACTIONS.END_TURN
  };
}

/**
 * Select "random" card for player to draw from the deck.
 *
 * @param cardIndex {number} - Index of the card to assign. Card owner must be currently undefined.
 */
function drawRandomCard(cardIndex) {
  return {
    type: ACTIONS.DRAW_RANDOM_CARD,
    cardIndex
  }
};

export default {
  startMatch,
  selectFirstPlayer,
  occupyTerritory,
  placeAdditionalArmy,
  tradeCards,
  endTrade,
  placeNewArmies,
  battle,
  rollDice,
  endAttack,
  capture,
  fortify,
  endTurn,
  drawRandomCard
}
