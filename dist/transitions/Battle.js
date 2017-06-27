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


exports.default = function (_ref, extendedState) {
  var edges = _ref.edges;
  var territories = extendedState.territories,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  return {
    guard: function guard(_ref2) {
      var type = _ref2.type,
          attackingTerritoryIndex = _ref2.attackingTerritoryIndex,
          defendingTerritoryIndex = _ref2.defendingTerritoryIndex,
          attackingDiceCount = _ref2.attackingDiceCount;
      return type === _constants.ACTIONS.BATTLE && Number.isInteger(attackingTerritoryIndex) && attackingTerritoryIndex >= 0 && attackingTerritoryIndex < territories.length && territories[attackingTerritoryIndex].owner === currentPlayerIndex && territories[attackingTerritoryIndex].armies > 1 && Number.isInteger(defendingTerritoryIndex) && defendingTerritoryIndex >= 0 && defendingTerritoryIndex < territories.length && territories[defendingTerritoryIndex].owner !== currentPlayerIndex && edges.some(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            a = _ref4[0],
            d = _ref4[1];

        return a === attackingTerritoryIndex && d === defendingTerritoryIndex;
      }) && attackingDiceCount >= 1 && attackingDiceCount <= Math.min(3, territories[attackingTerritoryIndex].armies - 1);
    },
    reduce: function reduce(_ref5) {
      var attackingTerritoryIndex = _ref5.attackingTerritoryIndex,
          defendingTerritoryIndex = _ref5.defendingTerritoryIndex,
          attackingDiceCount = _ref5.attackingDiceCount;
      return Object.assign({}, extendedState, {
        activeBattle: {
          attackingTerritoryIndex: attackingTerritoryIndex,
          defendingTerritoryIndex: defendingTerritoryIndex,
          attackingDiceCount: attackingDiceCount
        }
      });
    }
  };
};

var _constants = require('../constants');