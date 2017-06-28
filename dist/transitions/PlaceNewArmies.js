'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState, action) {
  var territories = extendedState.territories,
      players = extendedState.players,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  return {
    action: action,
    guard: function guard(_ref) {
      var type = _ref.type,
          territoryIndex = _ref.territoryIndex,
          armies = _ref.armies;
      return type === action && Number.isInteger(territoryIndex) && territoryIndex >= 0 && territoryIndex < territories.length && territories[territoryIndex].owner === currentPlayerIndex && players[currentPlayerIndex].undeployedArmies >= armies;
    },
    reduce: function reduce(_ref2) {
      var territoryIndex = _ref2.territoryIndex,
          armies = _ref2.armies;
      return Object.assign({}, extendedState, {
        territories: (0, _replaceElements4.default)(extendedState.territories, _defineProperty({}, territoryIndex, {
          owner: currentPlayerIndex,
          armies: extendedState.territories[territoryIndex].armies + armies
        })),
        players: (0, _replaceElements4.default)(extendedState.players, _defineProperty({}, currentPlayerIndex, {
          undeployedArmies: extendedState.players[currentPlayerIndex].undeployedArmies - armies
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
 * You must place all new armies earned during the beginning of the turn
 * and from trading cards.and
 */