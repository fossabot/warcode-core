'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (matchConfig, extendedState) {
  var players = extendedState.players;

  return {
    guard: function guard() {
      return players.every(function (p) {
        return p.undeployedArmies === 0;
      });
    },
    reduce: function reduce() {
      return extendedState;
    }
  };
};