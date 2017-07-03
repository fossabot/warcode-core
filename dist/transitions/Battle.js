'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
 */
exports.default = function (_ref, _ref2) {
  var edges = _ref.edges;
  var territories = _ref2.territories,
      currentPlayerIndex = _ref2.currentPlayerIndex;
  return {
    guard: function guard(_ref3) {
      var attackingTerritoryIndex = _ref3.attackingTerritoryIndex,
          defendingTerritoryIndex = _ref3.defendingTerritoryIndex,
          attackingDiceCount = _ref3.attackingDiceCount;
      return Number.isInteger(attackingTerritoryIndex) && attackingTerritoryIndex >= 0 && attackingTerritoryIndex < territories.length && territories[attackingTerritoryIndex].owner === currentPlayerIndex && territories[attackingTerritoryIndex].armies > 1 && Number.isInteger(defendingTerritoryIndex) && defendingTerritoryIndex >= 0 && defendingTerritoryIndex < territories.length && territories[defendingTerritoryIndex].owner !== currentPlayerIndex && edges.some(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            a = _ref5[0],
            d = _ref5[1];

        return a === attackingTerritoryIndex && d === defendingTerritoryIndex;
      }) && attackingDiceCount >= 1 && attackingDiceCount <= Math.min(3, territories[attackingTerritoryIndex].armies - 1);
    },
    reduce: function reduce(_ref6) {
      var attackingTerritoryIndex = _ref6.attackingTerritoryIndex,
          defendingTerritoryIndex = _ref6.defendingTerritoryIndex,
          attackingDiceCount = _ref6.attackingDiceCount;
      return {
        activeBattle: {
          attackingTerritoryIndex: attackingTerritoryIndex,
          defendingTerritoryIndex: defendingTerritoryIndex,
          attackingDiceCount: attackingDiceCount
        }
      };
    }
  };
};