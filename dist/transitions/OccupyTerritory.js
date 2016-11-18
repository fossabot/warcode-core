'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * At the start of the game, each player takes turns placing a single army
 * on an unoccupied territory.
 *
 * To occupy the territory, you must place an army on an unoccupied territory.
 * An unoccupied territory must have no owner or occupying armies.
 *
 * Upon occupying the territory
 * * The current player's undeployed armies are decremented
 * * The territory owner is updated to the current layer
 * * The territory armies are set to one
 * * Turn is passed to the next player
 *
 */


exports.default = function (matchConfig, extendedState) {
  var territories = extendedState.territories,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  var guard = function guard(action) {
    var territoryIndex = action.territoryIndex;

    return Number.isInteger(territoryIndex) && territoryIndex >= 0 && territoryIndex < territories.length && territories[territoryIndex].owner === undefined && territories[territoryIndex].armies === 0;
  };

  var reduce = function reduce(action) {
    var territoryIndex = action.territoryIndex;


    return _extends({}, extendedState, {
      territories: Object.assign([], extendedState.territories, _defineProperty({}, territoryIndex, {
        owner: currentPlayerIndex,
        armies: 1
      })),
      players: Object.assign([], extendedState.players, _defineProperty({}, currentPlayerIndex, {
        undeployedArmies: extendedState.players[currentPlayerIndex].undeployedArmies - 1
      }))
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.OCCUPY_TERRITORY, guard, reduce);
};

var _constants = require('../constants');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }