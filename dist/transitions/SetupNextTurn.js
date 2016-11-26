'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * At the beginning of your turn, you are awarded armies based on occupied
 * territories and continents.
 *
 * The number of new armies is the sum of the following
 * * The greater of 3 or ⅓ of an army for each territory owned
 * * The sum of armies awarded for each continent the player controls
 *
 * The match configuration defines the awards for each continent. For example,
 * the traditional rules use the following awards.
 *
 * | Continent      | Award |
 * |----------------|-------|
 * | Asia           | 7     |
 * | North America  | 5     |
 * | Europe         | 5     |
 * | Africa         | 3     |
 * | Australia      | 2     |
 * | South America  | 2     |
 *
 */


exports.default = function (matchConfig, extendedState) {
  var guard = function guard() {
    return undefined;
  };

  var reduce = function reduce(action) {
    // SETUP TURN
    var nextPlayer = (0, _nextPlayerIndex2.default)(extendedState);

    return _extends({}, extendedState, {
      currentPlayerIndex: nextPlayer,
      players: (0, _replaceElements3.default)(extendedState.players, _defineProperty({}, nextPlayer, {
        undeployedArmies: countUndeployedArmies(matchConfig, extendedState, nextPlayer)
      })),
      capturedTerritories: 0
    });
  };

  return new _Transition.Transition(guard, reduce);
};

var _nextPlayerIndex = require('./nextPlayerIndex');

var _nextPlayerIndex2 = _interopRequireDefault(_nextPlayerIndex);

var _Transition = require('./Transition');

var _replaceElements2 = require('./replaceElements');

var _replaceElements3 = _interopRequireDefault(_replaceElements2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function countUndeployedArmies(matchConfig, extendedState, playerIndex) {
  var currentArmies = extendedState.players[playerIndex].undeployedArmies;
  var territoryAward = calcTerrtitoryAward(extendedState, matchConfig, playerIndex);
  var continentAward = calcContinentAward(extendedState, matchConfig, playerIndex);
  return currentArmies + territoryAward + continentAward;
}

function calcTerrtitoryAward(extendedState, matchConfig, playerIndex) {
  var territoryOwnedCount = extendedState.territories.filter(function (t) {
    return t.owner === playerIndex;
  }).length;
  return Math.max(3, Math.floor(territoryOwnedCount / 3));
}

function calcContinentAward(extendedState, matchConfig, playerIndex) {
  var isContinentOwned = Array(matchConfig.continents.length).fill(true);

  var continentIndex = void 0;
  for (var i = 0; i < matchConfig.territories.length; i++) {
    if (extendedState.territories[i].owner !== playerIndex) {
      continentIndex = matchConfig.territories[i][1];
      isContinentOwned[continentIndex] = false;
    }
  }

  var reward = 0;
  for (var _i = 0; _i < matchConfig.continents.length; _i++) {
    if (isContinentOwned[_i]) {
      reward += matchConfig.continents[_i][1];
    }
  }
  return reward;
}