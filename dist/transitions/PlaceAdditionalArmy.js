'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * After players claim all territories, players take turns placing one
 * of their undeployed armies on territory they occupy each turn.
 *
 * When a player places an additional army,
 * * The current player looses one undeployed army
 * * The territory armies are incremented
 *
 */


exports.default = function (matchConfig, extendedState) {
  var territories = extendedState.territories,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  var guard = function guard(action) {
    var territoryIndex = action.territoryIndex;

    return Number.isInteger(territoryIndex) && territoryIndex >= 0 && territoryIndex < territories.length && territories[territoryIndex].owner === currentPlayerIndex && territories[territoryIndex].armies >= 1;
  };

  var reduce = function reduce(action) {
    var territoryIndex = action.territoryIndex;


    return _extends({}, extendedState, {
      territories: Object.assign([], extendedState.territories, _defineProperty({}, territoryIndex, {
        owner: currentPlayerIndex,
        armies: extendedState.territories[territoryIndex].armies + 1
      })),
      players: Object.assign([], extendedState.players, _defineProperty({}, currentPlayerIndex, {
        undeployedArmies: extendedState.players[currentPlayerIndex].undeployedArmies - 1
      }))
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.PLACE_ADDITIONAL_ARMY, guard, reduce);
};

var _constants = require('../constants');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }