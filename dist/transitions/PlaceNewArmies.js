'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  var territories = extendedState.territories,
      players = extendedState.players,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  var guard = function guard(action) {
    var territoryIndex = action.territoryIndex,
        armies = action.armies;


    return Number.isInteger(territoryIndex) && territoryIndex >= 0 && territoryIndex < territories.length && territories[territoryIndex].owner === currentPlayerIndex && players[currentPlayerIndex].undeployedArmies >= armies;
  };

  var reduce = function reduce(action) {
    var territoryIndex = action.territoryIndex,
        armies = action.armies;


    return Object.assign({}, extendedState, {
      territories: (0, _replaceElements4.default)(extendedState.territories, _defineProperty({}, territoryIndex, {
        owner: currentPlayerIndex,
        armies: extendedState.territories[territoryIndex].armies + armies
      })),
      players: (0, _replaceElements4.default)(extendedState.players, _defineProperty({}, currentPlayerIndex, {
        undeployedArmies: extendedState.players[currentPlayerIndex].undeployedArmies - armies
      }))
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.PLACE_NEW_ARMIES, guard, reduce);
};

var _constants = require('../constants');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

var _replaceElements3 = require('./replaceElements');

var _replaceElements4 = _interopRequireDefault(_replaceElements3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * You must place all new armies earned during the beginning of the turn
 * and from trading cards.and
 */