'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, _ref) {
  var players = _ref.players;
  return {
    guard: function guard() {
      return players.every(function (p) {
        return p.undeployedArmies === 0;
      });
    },
    reduce: function reduce() {}
  };
};