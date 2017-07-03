'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = require('../constants');

/**
 * Start match
 *
 * The number of players determines the number of armies each player receive.
 * The traditional rules award each player the number shown in this table.
 * However, this may vary based on the match settings.
 *
 * | Players | Armies |
 * |---------|--------|
 * | 3       | 35     |
 * | 4       | 30     |
 * | 5       | 25     |
 * | 6       | 20     |
 *
 * @example
 * const initialMatchState = reduce();
 * // initialMatchState === { stateID: STATES.INITIALIZING, ... }
 * getPrompt(initialMatchState, initialMatchState);
 * // returns { type: ACTIONS.START_MATCH, minPlayers: 3, maxPlayers: 6 }
 * const action = startMatch(5);
 * // action === { type: ACTIONS.START_MATCH, playerCount: 5 }
 * const newMatchState = reduce(initialMatchState, action);
 * // newMatchState === { stateID: STATES.SELECTING_FIRST_PLAYER, ... }
 *
 */
exports.default = function (_ref) {
  var minPlayers = _ref.minPlayers,
      maxPlayers = _ref.maxPlayers,
      territories = _ref.territories,
      cards = _ref.cards,
      startingArmiesByPlayers = _ref.startingArmiesByPlayers;
  return {
    guard: function guard(_ref2) {
      var playerCount = _ref2.playerCount;
      return Number.isInteger(playerCount) && playerCount >= minPlayers && playerCount <= maxPlayers;
    },
    reduce: function reduce(_ref3) {
      var playerCount = _ref3.playerCount;
      return {
        territories: Array(territories.length).fill({
          owner: undefined,
          armies: 0
        }),
        cardOwner: Array(cards.length).fill(undefined),
        players: Array(playerCount).fill({
          undeployedArmies: startingArmiesByPlayers[playerCount]
        }),
        currentPlayerIndex: -1,
        tradeCount: 0,
        capturedTerritories: 0,
        activeBattle: undefined,
        stateKey: _constants.STATES.INITIALIZING
      };
    }
  };
};