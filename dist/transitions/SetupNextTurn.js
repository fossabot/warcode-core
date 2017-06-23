'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = function (matchConfig, extendedState) {
  var guard = function guard() {
    return undefined;
  };

  var reduce = function reduce() {
    // SETUP TURN
    var nextPlayer = (0, _nextPlayerIndex2.default)(extendedState);

    return Object.assign({}, extendedState, {
      currentPlayerIndex: nextPlayer,
      players: (0, _replaceElements3.default)(extendedState.players, _defineProperty({}, nextPlayer, {
        undeployedArmies: countUndeployedArmies(matchConfig, extendedState, nextPlayer)
      })),
      capturedTerritories: 0
    });
  };

  return new _Transition2.default(guard, reduce);
};

var _nextPlayerIndex = require('./nextPlayerIndex');

var _nextPlayerIndex2 = _interopRequireDefault(_nextPlayerIndex);

var _Transition = require('./Transition');

var _Transition2 = _interopRequireDefault(_Transition);

var _replaceElements2 = require('./replaceElements');

var _replaceElements3 = _interopRequireDefault(_replaceElements2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function calcTerrtitoryAward(extendedState, matchConfig, playerIndex) {
  var territoryOwnedCount = extendedState.territories.filter(function (t) {
    return t.owner === playerIndex;
  }).length;
  return Math.max(3, Math.floor(territoryOwnedCount / 3));
}

function calcContinentAward(extendedState, matchConfig, playerIndex) {
  // find indexes of all continents where the player does not occupy
  // one or more territories
  var continentsWithTerritoryNotOwnedByCurrentPlayer = new Set(matchConfig.territories.filter(function (t, index) {
    return extendedState.territories[index].owner !== playerIndex;
  }).map(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        continentIndex = _ref2[1];

    return continentIndex;
  }));

  // total reward for each continent where the player owns all of the territories
  return matchConfig.continents.filter(function (continent, index) {
    return !continentsWithTerritoryNotOwnedByCurrentPlayer.has(index);
  }).reduce(function (reward, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        continentAward = _ref4[1];

    return reward + continentAward;
  }, 0);
}

function countUndeployedArmies(matchConfig, extendedState, playerIndex) {
  var currentArmies = extendedState.players[playerIndex].undeployedArmies;
  var territoryAward = calcTerrtitoryAward(extendedState, matchConfig, playerIndex);
  var continentAward = calcContinentAward(extendedState, matchConfig, playerIndex);
  return currentArmies + territoryAward + continentAward;
}

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