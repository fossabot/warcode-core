'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Select player to take first move, similarly to each player rolling
 * a die to determine the first player at the beginning the game.
 */
exports.default = function (matchConfig, _ref) {
  var players = _ref.players;
  return {
    guard: function guard(_ref2) {
      var firstPlayerIndex = _ref2.firstPlayerIndex;
      return Number.isInteger(firstPlayerIndex) && firstPlayerIndex >= 0 && firstPlayerIndex < players.length;
    },
    reduce: function reduce(_ref3) {
      var firstPlayerIndex = _ref3.firstPlayerIndex;
      return {
        currentPlayerIndex: firstPlayerIndex
      };
    }
  };
};