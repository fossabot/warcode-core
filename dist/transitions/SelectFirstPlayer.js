'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  var players = extendedState.players;


  return {
    guard: function guard(_ref) {
      var type = _ref.type,
          firstPlayerIndex = _ref.firstPlayerIndex;
      return type === _constants.ACTIONS.SELECT_FIRST_PLAYER && Number.isInteger(firstPlayerIndex) && firstPlayerIndex >= 0 && firstPlayerIndex < players.length;
    },
    reduce: function reduce(_ref2) {
      var firstPlayerIndex = _ref2.firstPlayerIndex;
      return Object.assign({}, extendedState, {
        currentPlayerIndex: firstPlayerIndex
      });
    }
  };
};

var _constants = require('../constants');