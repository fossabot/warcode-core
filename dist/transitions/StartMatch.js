'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig) {
  var minPlayers = matchConfig.minPlayers,
      maxPlayers = matchConfig.maxPlayers,
      territories = matchConfig.territories,
      cards = matchConfig.cards,
      startingArmiesByPlayers = matchConfig.startingArmiesByPlayers;


  return {
    guard: function guard(_ref) {
      var type = _ref.type,
          playerCount = _ref.playerCount;
      return type === _constants.ACTIONS.START_MATCH && Number.isInteger(playerCount) && playerCount >= minPlayers && playerCount <= maxPlayers;
    },
    reduce: function reduce(_ref2) {
      var playerCount = _ref2.playerCount;
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

var _constants = require('../constants');