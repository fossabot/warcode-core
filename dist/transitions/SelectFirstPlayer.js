'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState, action) {
  var players = extendedState.players;


  return {
    action: action,
    guard: function guard(_ref) {
      var type = _ref.type,
          firstPlayerIndex = _ref.firstPlayerIndex;
      return type === action && Number.isInteger(firstPlayerIndex) && firstPlayerIndex >= 0 && firstPlayerIndex < players.length;
    },
    reduce: function reduce(_ref2) {
      var firstPlayerIndex = _ref2.firstPlayerIndex;
      return Object.assign({}, extendedState, {
        currentPlayerIndex: firstPlayerIndex
      });
    }
  };
};