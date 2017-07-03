'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _replaceElements2 = require('./replaceElements');

var _replaceElements3 = _interopRequireDefault(_replaceElements2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * When you defeat all armies on a defending territory, you must occupy it by
 * moving armies from the attacking territory. The number of armies moved must
 * be at least the same number of dice rolled in the decisive battle.
 */
exports.default = function (matchConfig, _ref) {
  var territories = _ref.territories,
      capturedTerritories = _ref.capturedTerritories,
      activeBattle = _ref.activeBattle,
      currentPlayerIndex = _ref.currentPlayerIndex;
  return {
    guard: function guard(_ref2) {
      var armies = _ref2.armies;
      return !!activeBattle && Number.isInteger(armies) && armies >= activeBattle.attackingDiceCount && armies < territories[activeBattle.attackingTerritoryIndex].armies;
    },
    reduce: function reduce(_ref3) {
      var _replaceElements;

      var armies = _ref3.armies;

      if (!activeBattle) {
        return {};
      }
      var attackingTerritoryIndex = activeBattle.attackingTerritoryIndex,
          defendingTerritoryIndex = activeBattle.defendingTerritoryIndex;


      return {
        territories: (0, _replaceElements3.default)(territories, (_replaceElements = {}, _defineProperty(_replaceElements, attackingTerritoryIndex, {
          owner: territories[attackingTerritoryIndex].owner,
          armies: territories[attackingTerritoryIndex].armies - armies
        }), _defineProperty(_replaceElements, defendingTerritoryIndex, {
          owner: currentPlayerIndex,
          armies: armies
        }), _replaceElements)),
        capturedTerritories: capturedTerritories + 1,
        activeBattle: undefined
      };
    }
  };
};