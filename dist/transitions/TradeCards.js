'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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
 * An additional two armies may be awarded when one of the traded cards matches a territory the player occupies. These two armies are immediately placed on the territory itself. The award only applies to a single card.
 *
 * The three cards must meet one of the following
 * * types match: cards[i].type === cards[j].type AND cards[j].type == cards[k].type
 * * types are unique: cards[i].type != cards[j].type AND cards[i].type != cards[k].type AND cards[j].type != cards[k].type
 * * one is wild: cards[i].type == WILD OR cards[j].type == WILD OR cards[k].type == WILD
 */


exports.default = function (matchConfig, extendedState) {
  var cards = matchConfig.cards,
      cardOccupiedTerritoryReward = matchConfig.cardOccupiedTerritoryReward,
      cardTypeNames = matchConfig.cardTypeNames;
  var cardOwner = extendedState.cardOwner,
      territories = extendedState.territories,
      currentPlayerIndex = extendedState.currentPlayerIndex,
      tradeCount = extendedState.tradeCount;


  var guard = function guard(action) {
    var isValidIndices = function isValidIndices(x) {
      return x >= 0 && x < cards.length;
    };
    var i = action.i,
        j = action.j,
        k = action.k;

    var areValidIndices = isValidIndices(i) && isValidIndices(j) && isValidIndices(k);
    var areUniqueCards = i !== j && j !== k && i !== k;
    var isOwner = cardOwner[i] === currentPlayerIndex && cardOwner[j] === currentPlayerIndex && cardOwner[k] === currentPlayerIndex;
    if (!areValidIndices || !areUniqueCards || !isOwner) {
      return false;
    }
    var isWild = function isWild(index) {
      return cards[index][1] === null;
    };
    var containsWildCard = isWild(i) || isWild(j) || isWild(k);
    var a = cards[i][0];
    var b = cards[j][0];
    var c = cards[k][0];
    var isSameType = a === b && b === c;
    var areDifferentTypes = a !== b && a !== c && b !== c;
    return isSameType || areDifferentTypes || containsWildCard;
  };

  var reduce = function reduce(action) {
    var _Object$assign2;

    var i = action.i,
        j = action.j,
        k = action.k;

    var count = tradeCount + 1;
    var tradeAward = count <= 5 ? (count + 1) * 2 : (count - 3) * 5;
    var firstTerritoryAward = 0;
    if (cards[i].territoryID && territories[cards[i].territoryID].owner === currentPlayerIndex) {
      firstTerritoryAward = extendedState.territories[cards[i].territoryID].armies + cardOccupiedTerritoryReward;
    }

    return _extends({}, extendedState, {
      tradeCount: count,
      players: Object.assign([], extendedState.players, _defineProperty({}, currentPlayerIndex, {
        undeployedArmies: extendedState.players[currentPlayerIndex].undeployedArmies + tradeAward
      })),
      cardOwner: Object.assign([], extendedState.cardOwner, (_Object$assign2 = {}, _defineProperty(_Object$assign2, i, null), _defineProperty(_Object$assign2, j, null), _defineProperty(_Object$assign2, k, null), _Object$assign2)),
      territories: Object.assign([], extendedState.territories, _defineProperty({}, firstTerritory, {
        armies: extendedState.territories[firstTerritory].armies + firstTerritoryAward
      }))
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.TRADE_CARDS, guard, reduce);
};

var _constants = require('../constants');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }