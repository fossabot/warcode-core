'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  var territories = extendedState.territories,
      activeBattle = extendedState.activeBattle;


  var guard = function guard(action) {
    var attackerDice = action.attackerDice,
        defenderDice = action.defenderDice;

    return !!activeBattle && Array.isArray(attackerDice) && attackerDice.length === activeBattle.attackingDiceCount && attackerDice.every(function (d) {
      return d >= 1 && d <= 6;
    }) && Array.isArray(defenderDice) && defenderDice.length >= 1 && defenderDice.length <= Math.min(2, territories[activeBattle.defendingTerritoryIndex].armies) && defenderDice.every(function (d) {
      return d >= 1 && d <= 6;
    });
  };

  var reduce = function reduce(action) {
    var _replaceElements;

    var attackerDice = action.attackerDice,
        defenderDice = action.defenderDice;

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
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.ROLL_DICE, guard, reduce);
};

var _constants = require('../constants');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

var _replaceElements2 = require('./replaceElements');

var _replaceElements3 = _interopRequireDefault(_replaceElements2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getLoses = function getLoses(attackerDice, defenderDice) {
  var diceToCompare = Math.min(attackerDice.length, defenderDice.length);
  var sortDecending = function sortDecending(a, b) {
    return a < b ? 1 : -1;
  };
  var attackerDiceSorted = attackerDice.sort(sortDecending).slice(0, diceToCompare);
  var defenderDiceSorted = defenderDice.sort(sortDecending).slice(0, diceToCompare);
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