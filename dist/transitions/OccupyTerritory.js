'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState, action) {
  var territories = extendedState.territories,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  return {
    action: action,
    guard: function guard(_ref) {
      var type = _ref.type,
          territoryIndex = _ref.territoryIndex;
      return type === action && Number.isInteger(territoryIndex) && territoryIndex >= 0 && territoryIndex < territories.length && territories[territoryIndex].owner === undefined && territories[territoryIndex].armies === 0;
    },
    reduce: function reduce(_ref2) {
      var territoryIndex = _ref2.territoryIndex;
      return Object.assign({}, extendedState, {
        territories: (0, _replaceElements4.default)(extendedState.territories, _defineProperty({}, territoryIndex, {
          owner: currentPlayerIndex,
          armies: 1
        })),
        players: (0, _replaceElements4.default)(extendedState.players, _defineProperty({}, currentPlayerIndex, {
          undeployedArmies: extendedState.players[currentPlayerIndex].undeployedArmies - 1
        }))
      });
    }
  };
};

var _replaceElements3 = require('./replaceElements');

var _replaceElements4 = _interopRequireDefault(_replaceElements3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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