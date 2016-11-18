'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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


exports.default = function (matchConfig, extendedState) {
  var territories = extendedState.territories,
      activeBattle = extendedState.activeBattle;


  var guard = function guard(action) {
    var attackerDice = action.attackerDice,
        defenderDice = action.defenderDice;
    var attackingDiceCount = activeBattle.attackingDiceCount,
        defendingTerritoryIndex = activeBattle.defendingTerritoryIndex;

    var maxDefenderDice = Math.min(2, territories[defendingTerritoryIndex].armies);

    return Array.isArray(attackerDice) && attackerDice.length === attackingDiceCount && attackerDice.every(function (d) {
      return d >= 1 && d <= 6;
    }) && Array.isArray(defenderDice) && defenderDice.length >= 1 && defenderDice.length <= maxDefenderDice && defenderDice.every(function (d) {
      return d >= 1 && d <= 6;
    });
  };

  var reduce = function reduce(action) {
    var _Object$assign;

    var attackerDice = action.attackerDice,
        defenderDice = action.defenderDice;
    var attackingTerritoryIndex = activeBattle.attackingTerritoryIndex,
        defendingTerritoryIndex = activeBattle.defendingTerritoryIndex;

    var loses = getLoses(attackerDice, defenderDice);

    return _extends({}, extendedState, {
      territories: Object.assign([], extendedState.territories, (_Object$assign = {}, _defineProperty(_Object$assign, attackingTerritoryIndex, {
        owner: extendedState.territories[attackingTerritoryIndex].owner,
        armies: extendedState.territories[attackingTerritoryIndex].armies - loses.attacker
      }), _defineProperty(_Object$assign, defendingTerritoryIndex, {
        owner: extendedState.territories[defendingTerritoryIndex].owner,
        armies: extendedState.territories[defendingTerritoryIndex].armies - loses.defender
      }), _Object$assign))
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.ROLL_DICE, guard, reduce);
};

var _constants = require('../constants');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getLoses(attackerDice, defenderDice) {
  var diceToCompare = Math.min(attackerDice.length, defenderDice.length);
  var sortDecending = function sortDecending(a, b) {
    return a < b;
  };
  var attackerDiceSorted = [].concat(_toConsumableArray(attackerDice)).sort(sortDecending);
  var defenderDiceSorted = [].concat(_toConsumableArray(defenderDice)).sort(sortDecending);
  var loses = {
    defender: 0,
    attacker: 0
  };
  for (var i = 0; i < diceToCompare; i++) {
    if (attackerDiceSorted[i] > defenderDiceSorted[i]) {
      loses.defender++;
    } else {
      loses.attacker++;
    }
  }
  return loses;
};