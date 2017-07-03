'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _replaceElements2 = require('./replaceElements');

var _replaceElements3 = _interopRequireDefault(_replaceElements2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
exports.default = function (_ref, _ref2) {
  var edges = _ref.edges;
  var territories = _ref2.territories,
      currentPlayerIndex = _ref2.currentPlayerIndex;
  return {
    guard: function guard(_ref3) {
      var fromTerritoryIndex = _ref3.fromTerritoryIndex,
          toTerritoryIndex = _ref3.toTerritoryIndex,
          armies = _ref3.armies;
      return Number.isInteger(fromTerritoryIndex) && fromTerritoryIndex >= 0 && fromTerritoryIndex < territories.length && territories[fromTerritoryIndex].owner === currentPlayerIndex && territories[fromTerritoryIndex].armies > 1 && Number.isInteger(toTerritoryIndex) && toTerritoryIndex >= 0 && toTerritoryIndex < territories.length && territories[toTerritoryIndex].owner === currentPlayerIndex && edges.some(function (_ref4) {
        var _ref5 = _slicedToArray(_ref4, 2),
            a = _ref5[0],
            b = _ref5[1];

        return a === fromTerritoryIndex && b === toTerritoryIndex;
      }) && armies >= 1 && armies < territories[fromTerritoryIndex].armies;
    },
    reduce: function reduce(_ref6) {
      var _replaceElements;

      var fromTerritoryIndex = _ref6.fromTerritoryIndex,
          toTerritoryIndex = _ref6.toTerritoryIndex,
          armies = _ref6.armies;
      return {
        territories: (0, _replaceElements3.default)(territories, (_replaceElements = {}, _defineProperty(_replaceElements, fromTerritoryIndex, {
          owner: territories[fromTerritoryIndex].owner,
          armies: territories[fromTerritoryIndex].armies - armies
        }), _defineProperty(_replaceElements, toTerritoryIndex, {
          owner: territories[toTerritoryIndex].owner,
          armies: territories[toTerritoryIndex].armies + armies
        }), _replaceElements))
      };
    }
  };
};