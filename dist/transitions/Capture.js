'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * When you defeat all armies on a defending territory, you must occupy it by
 * moving armies from the attacking territory. The number of armies moved must
 * be at least the same number of dice rolled in the decisive battle.
 */


exports.default = function (matchConfig, extendedState) {
  var territories = extendedState.territories,
      activeBattle = extendedState.activeBattle,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  var guard = function guard(action) {
    var armies = action.armies;
    var attackingTerritoryIndex = activeBattle.attackingTerritoryIndex,
        attackingDiceCount = activeBattle.attackingDiceCount;

    return Number.isInteger(armies) && armies >= attackingDiceCount && armies < territories[attackingTerritoryIndex].armies;
  };

  var reduce = function reduce(action) {
    var _Object$assign;

    var armies = action.armies;
    var attackingTerritoryIndex = activeBattle.attackingTerritoryIndex,
        defendingTerritoryIndex = activeBattle.defendingTerritoryIndex;


    return _extends({}, extendedState, {
      territories: Object.assign([], extendedState.territories, (_Object$assign = {}, _defineProperty(_Object$assign, attackingTerritoryIndex, {
        owner: extendedState.territories[attackingTerritoryIndex].owner,
        armies: extendedState.territories[attackingTerritoryIndex].armies - armies
      }), _defineProperty(_Object$assign, defendingTerritoryIndex, {
        owner: currentPlayerIndex,
        armies: armies
      }), _Object$assign)),
      capturedTerritories: extendedState.capturedTerritories + 1,
      activeBattle: undefined
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.CAPTURE, guard, reduce);
};

var _constants = require('../constants');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }