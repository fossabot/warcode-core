// @flow
import { ACTIONS } from './constants';

/**
 * Start the match.
 *
 * @param playerCount - Number of players. The match settings determine the minimum and maximum number of players.
 * @example
 * let state = stateMachine.reduce();
 * let action = actionCreators.startMatch(3);
 * state = stateMachine.reduce(state, action);
 */
function startMatch(playerCount: number): {type: string, playerCount: number} {
  return {
    type: ACTIONS.START_MATCH,
    playerCount
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
function selectFirstPlayer(firstPlayerIndex: number): {type: string, firstPlayerIndex: number} {
  return {
    type: ACTIONS.SELECT_FIRST_PLAYER,
    firstPlayerIndex
  };
}

/**
 * Select territory to occupy.
 *
 * @param territoryIndex - Index of territory to occupy. It must be unoccupied.
 * @return {{ type: string; territoryIndex; }}
 */
function occupyTerritory(territoryIndex: number): {type: string, territoryIndex: number} {
  return {
    type: ACTIONS.OCCUPY_TERRITORY,
    territoryIndex
  };
}

/**
 * Select a territory you own to place an additional army.
 *
 * @param territoryIndex - Index of territory to place an additional army. You must occupy it.
 * @return {{ type: string; territoryIndex; } }
 */
function placeAdditionalArmy(territoryIndex: number): {type: string, territoryIndex: number} {
  return {
    type: ACTIONS.PLACE_ADDITIONAL_ARMY,
    territoryIndex
  };
}

/**
 * Select three cards to trade for armies.
 *
 * @param i - Index of first card to trade. This card will receive a territory bonus.
 * @param j - Index of card to trade
 * @param k - Index of card to trade
 */
function tradeCards(i: number, j: number, k: number): {type: string, i: number, j: number, k: number} {
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
function endTrade(): {type: string} {
  return {
    type: ACTIONS.END_TRADE
  };
}

/**
 * Place some undeployed armies on an occupied territory to start the turn
 * @param territoryIndex - index of territory to place new armies
 * @param armies - number of armies to place
 */
function placeNewArmies(territoryIndex: number, armies: number): {type: string, territoryIndex: number, armies: number} {
  return {
    type: ACTIONS.PLACE_NEW_ARMIES,
    territoryIndex,
    armies
  };
}

/**
 * Select a territory to attack, neighboring defending territory, and dice to roll
 * @param attackingTerritoryIndex - index of attacking territory
 * @param defendingTerritoryIndex - index of defending territory
 * @param attackingDiceCount - number of dice to be rolled by attacker
 */
function battle(attackingTerritoryIndex: number, defendingTerritoryIndex: number, attackingDiceCount: number): {type: string, attackingTerritoryIndex: number, defendingTerritoryIndex: number, attackingDiceCount: number} {
  return {
    type: ACTIONS.BATTLE,
    attackingTerritoryIndex,
    defendingTerritoryIndex,
    attackingDiceCount
  };
}

/**
 * Simulate attacker and defender rolling dice.
 * @param attackerDice - dice rolled by attacker
 * @param defenderDice - dice rolled by defender
 */
function rollDice(attackerDice: number[], defenderDice: number[]): {type: string, attackerDice: number[], defenderDice: number[]} {
  return {
    type: ACTIONS.ROLL_DICE,
    attackerDice,
    defenderDice
  };
}

/** End attack and begin fortifying */
function endAttack(): {type: string} {
  return {
    type: ACTIONS.END_ATTACK
  };
}

/**
 * Capture the defeated territory by moving armies into it
 * @param armies {number} - number of armies to move
 */
function capture(armies: number): {type: string, armies: number} {
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
function fortify(fromTerritoryIndex: number, toTerritoryIndex: number, armies: number): {type: string, fromTerritoryIndex: number, toTerritoryIndex: number, armies: number} {
  return {
    type: ACTIONS.FORTIFY,
    fromTerritoryIndex,
    toTerritoryIndex,
    armies
  }
}

/** End turn without fortifying. */
function endTurn(): {type: string} {
  return {
    type: ACTIONS.END_TURN
  };
}

/**
 * Select "random" card for player to draw from the deck.
 *
 * @param cardIndex - Index of the card to assign. Card owner must be currently undefined.
 */
function drawRandomCard(cardIndex: number): {type: string, cardIndex: number} {
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
