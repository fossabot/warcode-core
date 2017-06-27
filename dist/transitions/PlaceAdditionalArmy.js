'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  var territories = extendedState.territories,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  return {
    guard: function guard(_ref) {
      var type = _ref.type,
          territoryIndex = _ref.territoryIndex;
      return type === _constants.ACTIONS.PLACE_ADDITIONAL_ARMY && Number.isInteger(territoryIndex) && territoryIndex >= 0 && territoryIndex < territories.length && territories[territoryIndex].owner === currentPlayerIndex && territories[territoryIndex].armies >= 1;
    },
    reduce: function reduce(_ref2) {
      var territoryIndex = _ref2.territoryIndex;
      return Object.assign({}, extendedState, {
        territories: (0, _replaceElements4.default)(extendedState.territories, _defineProperty({}, territoryIndex, {
          owner: currentPlayerIndex,
          armies: extendedState.territories[territoryIndex].armies + 1
        })),
        players: (0, _replaceElements4.default)(extendedState.players, _defineProperty({}, currentPlayerIndex, {
          undeployedArmies: extendedState.players[currentPlayerIndex].undeployedArmies - 1
        }))
      });
    }
  };
};

var _constants = require('../constants');

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