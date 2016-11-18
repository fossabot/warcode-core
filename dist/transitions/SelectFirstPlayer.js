'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Select player to take first move, similarly to each player rolling
 * a die to determine the first player at the beginning the game.
 */


exports.default = function (matchConfig, extendedState) {
  var players = extendedState.players;


  var guard = function guard(action) {
    var firstPlayerIndex = action.firstPlayerIndex;

    return Number.isInteger(firstPlayerIndex) && firstPlayerIndex >= 0 && firstPlayerIndex < players.length;
  };

  var reduce = function reduce(action) {
    return _extends({}, extendedState, {
      currentPlayerIndex: action.firstPlayerIndex
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.SELECT_FIRST_PLAYER, guard, reduce);
};

var _constants = require('../constants');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }