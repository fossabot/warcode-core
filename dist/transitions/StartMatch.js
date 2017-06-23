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


  var guard = function guard(action) {
    var playerCount = action.playerCount;

    return Number.isInteger(playerCount) && playerCount >= minPlayers && playerCount <= maxPlayers;
  };

  var reduce = function reduce(action) {
    var playerCount = action.playerCount;

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
      activeBattle: undefined
    };
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.START_MATCH, guard, reduce);
};

var _constants = require('../constants');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }