'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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


exports.default = function (matchConfig, extendedState) {
  var edges = matchConfig.edges;
  var territories = extendedState.territories,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  var guard = function guard(action) {
    var fromTerritoryIndex = action.fromTerritoryIndex,
        toTerritoryIndex = action.toTerritoryIndex,
        armies = action.armies;

    return Number.isInteger(fromTerritoryIndex) && fromTerritoryIndex >= 0 && fromTerritoryIndex < territories.length && territories[fromTerritoryIndex].owner === currentPlayerIndex && territories[fromTerritoryIndex].armies > 1 && Number.isInteger(toTerritoryIndex) && toTerritoryIndex >= 0 && toTerritoryIndex < territories.length && territories[toTerritoryIndex].owner === currentPlayerIndex && edges.some(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          a = _ref2[0],
          b = _ref2[1];

      return a === fromTerritoryIndex && b === toTerritoryIndex;
    }) && armies >= 1 && armies < territories[fromTerritoryIndex].armies;
  };

  var reduce = function reduce(action) {
    var _Object$assign;

    var fromTerritoryIndex = action.fromTerritoryIndex,
        toTerritoryIndex = action.toTerritoryIndex,
        armies = action.armies;


    return _extends({}, extendedState, {
      territories: Object.assign([], extendedState.territories, (_Object$assign = {}, _defineProperty(_Object$assign, fromTerritoryIndex, {
        owner: extendedState.territories[fromTerritoryIndex].owner,
        armies: extendedState.territories[fromTerritoryIndex].armies - armies
      }), _defineProperty(_Object$assign, toTerritoryIndex, {
        owner: extendedState.territories[toTerritoryIndex].owner,
        armies: extendedState.territories[toTerritoryIndex].armies + armies
      }), _Object$assign))
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.FORTIFY, guard, reduce);
};

var _constants = require('../constants');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }