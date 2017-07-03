'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
 * Simulate player rolling dice.
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

exports.default = function (matchConfig, _ref) {
  var territories = _ref.territories,
      activeBattle = _ref.activeBattle;
  return {
    guard: function guard(_ref2) {
      var attackerDice = _ref2.attackerDice,
          defenderDice = _ref2.defenderDice;
      return !!activeBattle && Array.isArray(attackerDice) && attackerDice.length === activeBattle.attackingDiceCount && attackerDice.every(function (d) {
        return d >= 1 && d <= 6;
      }) && Array.isArray(defenderDice) && defenderDice.length >= 1 && defenderDice.length <= Math.min(2, territories[activeBattle.defendingTerritoryIndex].armies) && defenderDice.every(function (d) {
        return d >= 1 && d <= 6;
      });
    },
    reduce: function reduce(_ref3) {
      var _replaceElements;

      var attackerDice = _ref3.attackerDice,
          defenderDice = _ref3.defenderDice;

      if (!activeBattle) {
        return {};
      }

      var attackingTerritoryIndex = activeBattle.attackingTerritoryIndex;
      var defendingTerritoryIndex = activeBattle.defendingTerritoryIndex;
      var loses = getLoses(attackerDice, defenderDice);

      return {
        territories: (0, _replaceElements3.default)(territories, (_replaceElements = {}, _defineProperty(_replaceElements, attackingTerritoryIndex, {
          owner: territories[attackingTerritoryIndex].owner,
          armies: territories[attackingTerritoryIndex].armies - loses.attacker
        }), _defineProperty(_replaceElements, defendingTerritoryIndex, {
          owner: territories[defendingTerritoryIndex].owner,
          armies: territories[defendingTerritoryIndex].armies - loses.defender
        }), _replaceElements))
      };
    }
  };
};