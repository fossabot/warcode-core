'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('./constants');

/**
 * Start the match.
 *
 * @param playerCount - Number of players. The match settings determine
 *   the minimum and maximum number of players.
 * @example
 * let state = stateMachine.reduce();
 * let action = actionCreators.startMatch(3);
 * state = stateMachine.reduce(state, action);
 */
function startMatch(playerCount) {
  return {
    type: _constants.ACTIONS.START_MATCH,
    playerCount: playerCount
  };
}

/**
 * Select player to take first move, similarly to each player rolling a die
 * to begin the game.
 *
 * @param firstPlayerIndex - Index of the first player.
 * @example
 * let state = stateMachine.reduce();
 * let action = actionCreators.startMatch(3);
 * state = stateMachine.reduce(state, action);
 * action = actionCreators.selectFirstPlayer(0);
 * state = stateMachine.reduce(state, action);
 */

function selectFirstPlayer(firstPlayerIndex) {
  return {
    type: _constants.ACTIONS.SELECT_FIRST_PLAYER,
    firstPlayerIndex: firstPlayerIndex
  };
}

/**
 * Select territory to occupy.
 *
 * @param territoryIndex - Index of territory to occupy. It must be unoccupied.
 * @return {{ type: string; territoryIndex; }}
 */
function occupyTerritory(territoryIndex) {
  return {
    type: _constants.ACTIONS.OCCUPY_TERRITORY,
    territoryIndex: territoryIndex
  };
}

/**
 * Select a territory you own to place an additional army.
 *
 * @param territoryIndex - Index of territory to place an additional army. You must occupy it.
 * @return {{ type: string; territoryIndex; } }
 */
function placeAdditionalArmy(territoryIndex) {
  return {
    type: _constants.ACTIONS.PLACE_ADDITIONAL_ARMY,
    territoryIndex: territoryIndex
  };
}

/**
 * Select three cards to trade for armies.
 *
 * @param i - Index of first card to trade. This card will receive a territory bonus.
 * @param j - Index of card to trade
 * @param k - Index of card to trade
 */
function tradeCards(i, j, k) {
  return {
    type: _constants.ACTIONS.TRADE_CARDS,
    i: i,
    j: j,
    k: k
  };
}

/**
 * End trading and begin the attacking phase of the turn.
 * You must continue trading when you hold five or six cards.
 */
function endTrade() {
  return {
    type: _constants.ACTIONS.END_TRADE
  };
}

/**
 * Place some undeployed armies on an occupied territory to start the turn
 * @param territoryIndex - index of territory to place new armies
 * @param armies - number of armies to place
 */
function placeNewArmies(territoryIndex, armies) {
  return {
    type: _constants.ACTIONS.PLACE_NEW_ARMIES,
    territoryIndex: territoryIndex,
    armies: armies
  };
}

/**
 * Select a territory to attack, neighboring defending territory, and dice to roll
 * @param attackingTerritoryIndex - index of attacking territory
 * @param defendingTerritoryIndex - index of defending territory
 * @param attackingDiceCount - number of dice to be rolled by attacker
 */
function battle(attackingTerritoryIndex, defendingTerritoryIndex, attackingDiceCount) {
  return {
    type: _constants.ACTIONS.BATTLE,
    attackingTerritoryIndex: attackingTerritoryIndex,
    defendingTerritoryIndex: defendingTerritoryIndex,
    attackingDiceCount: attackingDiceCount
  };
}

/**
 * Simulate attacker and defender rolling dice.
 * @param attackerDice - dice rolled by attacker
 * @param defenderDice - dice rolled by defender
 */
function rollDice(attackerDice, defenderDice) {
  return {
    type: _constants.ACTIONS.ROLL_DICE,
    attackerDice: attackerDice,
    defenderDice: defenderDice
  };
}

/** End attack and begin fortifying */
function endAttack() {
  return {
    type: _constants.ACTIONS.END_ATTACK
  };
}

/**
 * Capture the defeated territory by moving armies into it
 * @param armies {number} - number of armies to move
 */
function capture(armies) {
  return {
    type: _constants.ACTIONS.CAPTURE,
    armies: armies
  };
}

/**
 * Move armies between two of your adjacent territories before ending your turn.
 *
 * @param fromTerritoryIndex - Index of territory to move armies from. Must
 *   be owned by you, have more than one army, and be adjacent to toTerritoryIndex.
 * @param toTerritoryIndex - Index of territory to move armies to. Must be
 *   owned by you and adjacent to fromTerritoryIndex.
 * @param armies - Number of armies to move. You must leave one army behind,
 *   so the number may between one and the number of the armies on fromTerritoryIndex.
 */
function fortify(fromTerritoryIndex, toTerritoryIndex, armies) {
  return {
    type: _constants.ACTIONS.FORTIFY,
    fromTerritoryIndex: fromTerritoryIndex,
    toTerritoryIndex: toTerritoryIndex,
    armies: armies
  };
}

/** End turn without fortifying. */
function endTurn() {
  return {
    type: _constants.ACTIONS.END_TURN
  };
}

/**
 * Select "random" card for player to draw from the deck.
 *
 * @param cardIndex - Index of the card to assign. Card owner must be currently undefined.
 */
function drawRandomCard(cardIndex) {
  return {
    type: _constants.ACTIONS.DRAW_RANDOM_CARD,
    cardIndex: cardIndex
  };
}

exports.default = {
  startMatch: startMatch,
  selectFirstPlayer: selectFirstPlayer,
  occupyTerritory: occupyTerritory,
  placeAdditionalArmy: placeAdditionalArmy,
  tradeCards: tradeCards,
  endTrade: endTrade,
  placeNewArmies: placeNewArmies,
  battle: battle,
  rollDice: rollDice,
  endAttack: endAttack,
  capture: capture,
  fortify: fortify,
  endTurn: endTurn,
  drawRandomCard: drawRandomCard
};