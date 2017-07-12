// @flow
import { ACTIONS } from './constants';

/**
 * Start the match by selecting the number of players. Each player will receive
 * the same number of armies to deploy. This number depends on the number of players.
 * The default match config awards players the following:
 *
 * | Players | Armies |
 * | :------ | -----: |
 * | 3       | 35     |
 * | 4       | 30     |
 * | 5       | 25     |
 * | 6       | 20     |
 *
 * @summary Start the match.
 * @param playerCount - Number of players. The match settings determine
 *   the minimum and maximum number of players.
 * @example
 * const { actionCreators, reduce } = require('warcode-core');
 * let state = reduce();
 * let action = actionCreators.startMatch(3);
 * state = reduce(state, action);
 */
function startMatch(playerCount: number): { type: string, playerCount: number } {
  return {
    type: ACTIONS.START_MATCH,
    playerCount,
  };
}

/**
 * Select player to take first move, similarly to each player rolling
 * a die to determine the first player at the beginning the game.
 *
 * @summary Select player to take first move, similarly to each player rolling a die
 * to begin the game.
 * @param firstPlayerIndex - Index of the first player.
 * @example
 * const { actionCreators, reduce } = require('warcode-core');
 * let state = reduce();
 * let action = actionCreators.startMatch(3);
 * state = reduce(state, action);
 * action = actionCreators.selectFirstPlayer(0);
 * state = reduce(state, action);
 */
function selectFirstPlayer(firstPlayerIndex: number): { type: string, firstPlayerIndex: number } {
  return {
    type: ACTIONS.SELECT_FIRST_PLAYER,
    firstPlayerIndex,
  };
}

/**
 * At the start of the game, each player takes turns placing a single army
 * on an unoccupied territory.
 *
 * To occupy the territory, you must place an army on an unoccupied territory.
 * An unoccupied territory must have no owner or occupying armies.
 *
 * Upon occupying the territory
 * * The current player's undeployed armies are decremented
 * * The territory owner is updated to the current layer
 * * The territory armies are set to one
 * * Turn is passed to the next player
 *
 * @summary Select territory to occupy.
 * @param territoryIndex - Index of territory to occupy. It must be unoccupied.
 * @example
 * const { actionCreators, reduce } = require('warcode-core');
 * let state = reduce();
 * state = reduce(state, actionCreators.startMatch(3));
 * state = reduce(state, actionCreators.selectFirstPlayer(0));
 * state = reduce(state, actionCreators.occupyTerritory(0));
 */
function occupyTerritory(territoryIndex: number): { type: string, territoryIndex: number } {
  return {
    type: ACTIONS.OCCUPY_TERRITORY,
    territoryIndex,
  };
}

/**
 * After players claim all territories, players take turns placing one
 * of their undeployed armies on territory they occupy each turn.
 *
 * When a player places an additional army,
 * * The current player looses one undeployed army
 * * The territory armies are incremented
 *
 * @summary Select a territory you own to place an additional army.
 * @param territoryIndex - Index of territory to place an additional army. You must occupy it.
 * @return {{ type: string; territoryIndex; } }
 * @example
 * const { actionCreators, reduce } = require('warcode-core');
 * let state = reduce();
 * state = reduce(state, actionCreators.startMatch(3));
 * state = reduce(state, actionCreators.selectFirstPlayer(0));
 * state = reduce(state, actionCreators.occupyTerritory(0));
 * state = reduce(state, actionCreators.occupyTerritory(1));
 * // ...
 * state = reduce(state, actionCreators.placeAdditionalArmy(0));
 */
function placeAdditionalArmy(territoryIndex: number): { type: string, territoryIndex: number } {
  return {
    type: ACTIONS.PLACE_ADDITIONAL_ARMY,
    territoryIndex,
  };
}

/**
 * Trade three cards for armies. The award increases
 * after each trade made by any player during the match.
 *
 * | Trade | Award |                 |
 * |-------|-------|-----------------|
 * | 1     | 4     | (trade + 1) * 2 |
 * | 2     | 6     | (trade + 1) * 2 |
 * | 3     | 8     | (trade + 1) * 2 |
 * | 4     | 10    | (trade + 1) * 2 |
 * | 5     | 12    | (trade + 1) * 2 |
 * | 6     | 15    | (trade - 3) * 5 |
 * | 7     | 20    | (trade - 3) * 5 |
 * | 8     | 25    | (trade - 3) * 5 |
 * | 9     | 30    | (trade - 3) * 5 |
 *
 * An additional two armies may be awarded when one of the traded cards matches
 * a territory the player occupies. These two armies are immediately placed on
 * the territory itself. The award only applies to a single card.
 *
 * The three cards must meet one of the following
 * * types match: cards[i].type === cards[j].type AND cards[j].type == cards[k].type
 * * types are unique: cards[i].type != cards[j].type AND
 *   cards[i].type != cards[k].type AND cards[j].type != cards[k].type
 * * one is wild: cards[i].type == WILD OR cards[j].type == WILD OR cards[k].type == WILD
 *
 * @summary Select three cards to trade for armies.
 * @param i - Index of first card to trade. This card will receive a territory bonus.
 * @param j - Index of card to trade
 * @param k - Index of card to trade
 * @example
 * const { actionCreators, reduce } = require('warcode-core');
 * let state = reduce();
 * state = reduce(state, actionCreators.startMatch(3));
 * state = reduce(state, actionCreators.selectFirstPlayer(0));
 * // conquer territories for a few turns, be awesome, collect cards, and then ...
 * state = reduce(state, actionCreators.tradeCards(0, 1, 2));
 */
function tradeCards(
  i: number,
  j: number,
  k: number
): {
  type: string,
  i: number,
  j: number,
  k: number,
} {
  return {
    type: ACTIONS.TRADE_CARDS,
    i,
    j,
    k,
  };
}

/**
 * End trading and begin the attacking phase of the turn.
 * You must continue trading when you hold five or six cards.
 *
 * @summary You may end trading as long as you hold four or fewer cards.
 */
function endTrade(): { type: string } {
  return {
    type: ACTIONS.END_TRADE,
  };
}

/**
 * You must place all new armies earned during the beginning of the turn
 * and from trading cards.
 *
 * @summary Place some undeployed armies on an occupied territory to start the turn
 * @param territoryIndex - index of territory to place new armies
 * @param armies - number of armies to place
 */
function placeNewArmies(
  territoryIndex: number,
  armies: number
): {
  type: string,
  territoryIndex: number,
  armies: number,
} {
  return {
    type: ACTIONS.PLACE_NEW_ARMIES,
    territoryIndex,
    armies,
  };
}

/**
 * The objective of battling is to capture an opponent's territory by defeating all of its armies.
 *
 * To attack, you must select an attacking territory that
 * * you own
 * * has more than one army
 * * is adjacent to the defending territory
 *
 * When you attack, you must decide to roll 1, 2, or 3 dice. You can roll no
 * more dice than one more than the number of armies on the attacking territory.
 * For example, if you are attacking from a territory with three armies, you
 * may only roll two dice.
 *
 * @summary Select a territory to attack, neighboring defending territory, and dice to roll
 * @param attackingTerritory - index of attacking territory
 * @param defendingTerritory - index of defending territory
 * @param attackingDiceCount - number of dice to be rolled by attacker
 */
function battle(
  attackingTerritory: number,
  defendingTerritory: number,
  attackingDiceCount: number
): {
  type: string,
  attackingTerritory: number,
  defendingTerritory: number,
  attackingDiceCount: number,
} {
  return {
    type: ACTIONS.BATTLE,
    attackingTerritory,
    defendingTerritory,
    attackingDiceCount,
  };
}

/**
 * Simulate players rolling dice.
 *
 * The attacker and defender may loose armies based on the random outcome of the
 * dice rolled. Compare the highest die rolled by the attacker and defender -
 * if the attacker's die is higher the defending territory looses an army,
 * otherwise the attacker looses an army. If the attacker and defender rolled
 * two or more dice, compare the second highest pair. If the attacker's die is
 * higher the defending territory looses an army, otherwise the attacker looses
 * an army.
 *
 * The owner of the defending territory may roll a single die when the defending
 * territory contains a single army. When the territory contains multiple
 * armies, the defender may roll either one or two dice.
 *
 * @summary Simulate attacker and defender rolling dice.
 * @param attackerDice - dice rolled by attacker
 * @param defenderDice - dice rolled by defender
 */
function rollDice(
  attackerDice: number[],
  defenderDice: number[]
): {
  type: string,
  attackerDice: number[],
  defenderDice: number[],
} {
  return {
    type: ACTIONS.ROLL_DICE,
    attackerDice,
    defenderDice,
  };
}

/**
 * You may stop attacking opponent's territories at anytime.
 * @summary End attack and begin fortifying
 */
function endAttack(): { type: string } {
  return {
    type: ACTIONS.END_ATTACK,
  };
}

/**
 * When you defeat all armies on a defending territory, you must occupy it by
 * moving armies from the attacking territory. The number of armies moved must
 * be at least the same number of dice rolled in the decisive battle.
 *
 * @summary Capture the defeated territory by moving armies into it
 * @param armies - number of armies to move
 */
function capture(armies: number): { type: string, armies: number } {
  return {
    type: ACTIONS.CAPTURE,
    armies,
  };
}

/**
 * During fortification, you may move armies between two of your adjacent
 * territories before ending your turn.
 *
 * Fortification has a few requirements
 * * you own territory to move armies from
 * * you own territory to move armies to
 * * territories are share and adjacent border
 * * armies to move are less than armies on source territory
 *
 * You may end your turn, skipping fortification.
 *
 * @summary Move armies between two of your adjacent territories before ending your turn.
 *
 * @param fromTerritoryIndex - Index of territory to move armies from. Must
 *   be owned by you, have more than one army, and be adjacent to toTerritoryIndex.
 * @param toTerritoryIndex - Index of territory to move armies to. Must be
 *   owned by you and adjacent to fromTerritoryIndex.
 * @param armies - Number of armies to move. You must leave one army behind,
 *   so the number may between one and the number of the armies on fromTerritoryIndex.
 */
function fortify(
  fromTerritoryIndex: number,
  toTerritoryIndex: number,
  armies: number
): {
  type: string,
  fromTerritoryIndex: number,
  toTerritoryIndex: number,
  armies: number,
} {
  return {
    type: ACTIONS.FORTIFY,
    fromTerritoryIndex,
    toTerritoryIndex,
    armies,
  };
}

/**
 * End turn without fortifying.
 * @summary You end the turn, ending fortification.
 */
function endTurn(): { type: string } {
  return {
    type: ACTIONS.END_TURN,
  };
}

/**
 * Select a random index of a card for the player to draw from the deck.
 *
 * @summary Select "random" card for player to draw from the deck.
 * @param cardIndex - Index of the card to assign. Card owner must be currently undefined.
 */
function drawRandomCard(cardIndex: number): { type: string, cardIndex: number } {
  return {
    type: ACTIONS.DRAW_RANDOM_CARD,
    cardIndex,
  };
}

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
  drawRandomCard,
};
