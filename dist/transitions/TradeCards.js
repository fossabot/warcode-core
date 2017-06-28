'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (_ref, extendedState, action) {
  var cards = _ref.cards,
      cardOccupiedTerritoryReward = _ref.cardOccupiedTerritoryReward;
  var cardOwner = extendedState.cardOwner,
      territories = extendedState.territories,
      currentPlayerIndex = extendedState.currentPlayerIndex,
      tradeCount = extendedState.tradeCount;


  return {
    action: action,
    guard: function guard(_ref2) {
      var type = _ref2.type,
          i = _ref2.i,
          j = _ref2.j,
          k = _ref2.k;

      if (type !== action) {
        return false;
      }
      var isValidIndices = function isValidIndices(x) {
        return x >= 0 && x < cards.length;
      };
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
    },
    reduce: function reduce(_ref3) {
      var _replaceElements2;

      var i = _ref3.i,
          j = _ref3.j,
          k = _ref3.k;

      var count = tradeCount + 1;
      var tradeAward = count <= 5 ? (count + 1) * 2 : (count - 3) * 5;

      var territoryUpdate = function () {
        if (cards[i][1] === undefined || cards[i][1] < 0) {
          return {};
        }

        var firstCardTerritoryIndex = cards[i][1];
        if (territories[firstCardTerritoryIndex].owner !== currentPlayerIndex) {
          return {};
        }

        var card = extendedState.territories[firstCardTerritoryIndex];
        return _defineProperty({}, firstCardTerritoryIndex, {
          owner: card.owner,
          armies: card.armies + cardOccupiedTerritoryReward
        });
      }();

      return Object.assign({}, extendedState, {
        tradeCount: count,
        players: (0, _replaceElements4.default)(extendedState.players, _defineProperty({}, currentPlayerIndex, {
          undeployedArmies: extendedState.players[currentPlayerIndex].undeployedArmies + tradeAward
        })),
        cardOwner: (0, _replaceElements4.default)(extendedState.cardOwner, (_replaceElements2 = {}, _defineProperty(_replaceElements2, i, null), _defineProperty(_replaceElements2, j, null), _defineProperty(_replaceElements2, k, null), _replaceElements2)),
        territories: (0, _replaceElements4.default)(extendedState.territories, territoryUpdate)
      });
    }
  };
};

var _replaceElements3 = require('./replaceElements');

var _replaceElements4 = _interopRequireDefault(_replaceElements3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
 */