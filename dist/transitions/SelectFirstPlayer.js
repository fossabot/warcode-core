'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  var players = extendedState.players;


  var guard = function guard(action) {
    var firstPlayerIndex = action.firstPlayerIndex;

    return Number.isInteger(firstPlayerIndex) && firstPlayerIndex >= 0 && firstPlayerIndex < players.length;
  };

  var reduce = function reduce(action) {
    return Object.assign({}, extendedState, {
      currentPlayerIndex: action.firstPlayerIndex
    });
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.SELECT_FIRST_PLAYER, guard, reduce);
};

var _constants = require('../constants');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }