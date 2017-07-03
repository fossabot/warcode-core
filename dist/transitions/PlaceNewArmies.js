'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _replaceElements3 = require('./replaceElements');

var _replaceElements4 = _interopRequireDefault(_replaceElements3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * You must place all new armies earned during the beginning of the turn
 * and from trading cards.and
 */
exports.default = function (matchConfig, _ref) {
  var territories = _ref.territories,
      players = _ref.players,
      currentPlayerIndex = _ref.currentPlayerIndex;
  return {
    guard: function guard(_ref2) {
      var territoryIndex = _ref2.territoryIndex,
          armies = _ref2.armies;
      return Number.isInteger(territoryIndex) && territoryIndex >= 0 && territoryIndex < territories.length && territories[territoryIndex].owner === currentPlayerIndex && players[currentPlayerIndex].undeployedArmies >= armies;
    },
    reduce: function reduce(_ref3) {
      var territoryIndex = _ref3.territoryIndex,
          armies = _ref3.armies;
      return {
        territories: (0, _replaceElements4.default)(territories, _defineProperty({}, territoryIndex, {
          owner: currentPlayerIndex,
          armies: territories[territoryIndex].armies + armies
        })),
        players: (0, _replaceElements4.default)(players, _defineProperty({}, currentPlayerIndex, {
          undeployedArmies: players[currentPlayerIndex].undeployedArmies - armies
        }))
      };
    }
  };
};