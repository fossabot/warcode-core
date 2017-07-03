'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _replaceElements3 = require('./replaceElements');

var _replaceElements4 = _interopRequireDefault(_replaceElements3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * After players claim all territories, players take turns placing one
 * of their undeployed armies on territory they occupy each turn.
 *
 * When a player places an additional army,
 * * The current player looses one undeployed army
 * * The territory armies are incremented
 *
 */
exports.default = function (matchConfig, _ref) {
  var players = _ref.players,
      territories = _ref.territories,
      currentPlayerIndex = _ref.currentPlayerIndex;
  return {
    guard: function guard(_ref2) {
      var territoryIndex = _ref2.territoryIndex;
      return Number.isInteger(territoryIndex) && territoryIndex >= 0 && territoryIndex < territories.length && territories[territoryIndex].owner === currentPlayerIndex && territories[territoryIndex].armies >= 1;
    },
    reduce: function reduce(_ref3) {
      var territoryIndex = _ref3.territoryIndex;
      return {
        territories: (0, _replaceElements4.default)(territories, _defineProperty({}, territoryIndex, {
          owner: currentPlayerIndex,
          armies: territories[territoryIndex].armies + 1
        })),
        players: (0, _replaceElements4.default)(players, _defineProperty({}, currentPlayerIndex, {
          undeployedArmies: players[currentPlayerIndex].undeployedArmies - 1
        }))
      };
    }
  };
};