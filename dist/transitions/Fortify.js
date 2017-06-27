'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

/**
 * During fortification, you may move armies between two of your adjacent
 * territories before ending your turn.
 *
 * Fortification has a few requirements
 * * you own territory to move armies from
 * * you own territory to move armies to
 * * territories are share and adjacent border
 * * armies to move are less than armies on source territory
 *
 *  You may end your turn, skipping fortification.
 */


exports.default = function (_ref, extendedState) {
  var edges = _ref.edges;
  var territories = extendedState.territories,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  return {
    guard: function guard(_ref2) {
      var type = _ref2.type,
          fromTerritoryIndex = _ref2.fromTerritoryIndex,
          toTerritoryIndex = _ref2.toTerritoryIndex,
          armies = _ref2.armies;
      return type === _constants.ACTIONS.FORTIFY && Number.isInteger(fromTerritoryIndex) && fromTerritoryIndex >= 0 && fromTerritoryIndex < territories.length && territories[fromTerritoryIndex].owner === currentPlayerIndex && territories[fromTerritoryIndex].armies > 1 && Number.isInteger(toTerritoryIndex) && toTerritoryIndex >= 0 && toTerritoryIndex < territories.length && territories[toTerritoryIndex].owner === currentPlayerIndex && edges.some(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            a = _ref4[0],
            b = _ref4[1];

        return a === fromTerritoryIndex && b === toTerritoryIndex;
      }) && armies >= 1 && armies < territories[fromTerritoryIndex].armies;
    },
    reduce: function reduce(_ref5) {
      var _replaceElements;

      var fromTerritoryIndex = _ref5.fromTerritoryIndex,
          toTerritoryIndex = _ref5.toTerritoryIndex,
          armies = _ref5.armies;
      return Object.assign({}, extendedState, {
        territories: (0, _replaceElements3.default)(extendedState.territories, (_replaceElements = {}, _defineProperty(_replaceElements, fromTerritoryIndex, {
          owner: extendedState.territories[fromTerritoryIndex].owner,
          armies: extendedState.territories[fromTerritoryIndex].armies - armies
        }), _defineProperty(_replaceElements, toTerritoryIndex, {
          owner: extendedState.territories[toTerritoryIndex].owner,
          armies: extendedState.territories[toTerritoryIndex].armies + armies
        }), _replaceElements))
      });
    }
  };
};

var _constants = require('../constants');

var _replaceElements2 = require('./replaceElements');

var _replaceElements3 = _interopRequireDefault(_replaceElements2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }