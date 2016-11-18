'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  var cards = extendedState.cards,
      currentPlayerIndex = extendedState.currentPlayerIndex;


  var guard = function guard() {
    var cardsHeldByPlayer = cards.filter(function (c) {
      return c.owner === currentPlayerIndex;
    }).size();
    return cardsHeldByPlayer < 5;
  };

  var reduce = function reduce(action) {
    return extendedState;
  };

  return new _TransitionGuarded2.default(_constants.ACTIONS.END_TRADE, guard, reduce);
};

var _constants = require('../constants');

var _TransitionGuarded = require('./TransitionGuarded');

var _TransitionGuarded2 = _interopRequireDefault(_TransitionGuarded);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }