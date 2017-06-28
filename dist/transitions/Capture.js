'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState, action) {
  var territories = extendedState.territories,
      activeBattle = extendedState.activeBattle,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  return {
    action: action,
    guard: function guard(_ref) {
      var type = _ref.type,
          armies = _ref.armies;
      return type === action && !!activeBattle && Number.isInteger(armies) && armies >= activeBattle.attackingDiceCount && armies < territories[activeBattle.attackingTerritoryIndex].armies;
    },
    reduce: function reduce(_ref2) {
      var _replaceElements;

      var armies = _ref2.armies;

      if (!activeBattle) {
        return extendedState;
      }
      var attackingTerritoryIndex = activeBattle.attackingTerritoryIndex,
          defendingTerritoryIndex = activeBattle.defendingTerritoryIndex;


      return Object.assign({}, extendedState, {
        territories: (0, _replaceElements3.default)(extendedState.territories, (_replaceElements = {}, _defineProperty(_replaceElements, attackingTerritoryIndex, {
          owner: extendedState.territories[attackingTerritoryIndex].owner,
          armies: extendedState.territories[attackingTerritoryIndex].armies - armies
        }), _defineProperty(_replaceElements, defendingTerritoryIndex, {
          owner: currentPlayerIndex,
          armies: armies
        }), _replaceElements)),
        capturedTerritories: extendedState.capturedTerritories + 1,
        activeBattle: undefined
      });
    }
  };
};

var _replaceElements2 = require('./replaceElements');

var _replaceElements3 = _interopRequireDefault(_replaceElements2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * When you defeat all armies on a defending territory, you must occupy it by
 * moving armies from the attacking territory. The number of armies moved must
 * be at least the same number of dice rolled in the decisive battle.
 */