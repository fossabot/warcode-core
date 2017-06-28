'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState, action) {
  var territories = extendedState.territories,
      activeBattle = extendedState.activeBattle;


  return {
    action: action,
    guard: function guard(_ref) {
      var type = _ref.type,
          attackerDice = _ref.attackerDice,
          defenderDice = _ref.defenderDice;
      return type === action && !!activeBattle && Array.isArray(attackerDice) && attackerDice.length === activeBattle.attackingDiceCount && attackerDice.every(function (d) {
        return d >= 1 && d <= 6;
      }) && Array.isArray(defenderDice) && defenderDice.length >= 1 && defenderDice.length <= Math.min(2, territories[activeBattle.defendingTerritoryIndex].armies) && defenderDice.every(function (d) {
        return d >= 1 && d <= 6;
      });
    },
    reduce: function reduce(_ref2) {
      var _replaceElements;

      var attackerDice = _ref2.attackerDice,
          defenderDice = _ref2.defenderDice;

      if (!activeBattle) {
        return extendedState;
      }

      var attackingTerritoryIndex = activeBattle.attackingTerritoryIndex;
      var defendingTerritoryIndex = activeBattle.defendingTerritoryIndex;
      var loses = getLoses(attackerDice, defenderDice);

      return Object.assign({}, extendedState, {
        territories: (0, _replaceElements3.default)(extendedState.territories, (_replaceElements = {}, _defineProperty(_replaceElements, attackingTerritoryIndex, {
          owner: extendedState.territories[attackingTerritoryIndex].owner,
          armies: extendedState.territories[attackingTerritoryIndex].armies - loses.attacker
        }), _defineProperty(_replaceElements, defendingTerritoryIndex, {
          owner: extendedState.territories[defendingTerritoryIndex].owner,
          armies: extendedState.territories[defendingTerritoryIndex].armies - loses.defender
        }), _replaceElements))
      });
    }
  };
};

var _replaceElements2 = require('./replaceElements');

var _replaceElements3 = _interopRequireDefault(_replaceElements2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var getLoses = function getLoses(attackerDice, defenderDice) {
  var diceToCompare = Math.min(attackerDice.length, defenderDice.length);
  var sortDecending = function sortDecending(a, b) {
    return a < b ? 1 : -1;
  };
  // eslint-disable-next-line fp/no-mutating-methods
  var attackerDiceSorted = [].concat(_toConsumableArray(attackerDice)).sort(sortDecending).slice(0, diceToCompare);
  // eslint-disable-next-line fp/no-mutating-methods
  var defenderDiceSorted = [].concat(_toConsumableArray(defenderDice)).sort(sortDecending).slice(0, diceToCompare);
  var defenderLoses = defenderDiceSorted.filter(function (d, i) {
    return attackerDiceSorted[i] > d;
  }).length;
  return {
    defender: defenderLoses,
    attacker: diceToCompare - defenderLoses
  };
};

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
 */