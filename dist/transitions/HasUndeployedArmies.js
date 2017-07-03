'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, _ref) {
  var players = _ref.players,
      currentPlayerIndex = _ref.currentPlayerIndex;
  return {
    guard: function guard() {
      return players[currentPlayerIndex].undeployedArmies >= 1;
    },
    reduce: function reduce() {}
  };
};